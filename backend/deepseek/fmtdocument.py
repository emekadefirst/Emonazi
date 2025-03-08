import asyncio
import aiohttp
import re
import json
import os
import pdfkit
from dotenv import load_dotenv

load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")
DEEPSEEK_URL = os.getenv("DEEPSEEK_URL")

async def formatPrompt(content: str):
    prompt = f"""
    Generate Python code to create a PDF resume using pdfkit (wkhtmltopdf) from this input: {content}. The input is a structured string with sections separated by newlines. The first line is the name/title; subsequent sections start with all-uppercase headers (e.g., 'TECHNICAL SKILLS'). The code must:
    - Parse the input into sections based on uppercase headers.
    - Create an HTML template with CSS (clean layout, Arial font, two-column design: skills/education/certifications on left, experience/projects/metrics on right).
    - Convert '• '-prefixed lines to <ul> lists, others to <p> or <h3> (e.g., job titles).
    - Use pdfkit to save as PDF.
    - Output ONLY the Python code, wrapped in ```python ... ```, with an 'html = """ """' string. NO explanations, NO thoughts, NO extra text—JUST the code.
    """
    return prompt

async def generate_doc(content: str, fullname: str):
    if not HF_API_KEY or not DEEPSEEK_URL:
        return {"status": "error", "message": "API key or URL not set"}

    content = content.replace("\\n", "\n")
    uPrompt = await formatPrompt(content)
    DATA = {
        "model": "accounts/fireworks/models/deepseek-r1",
        "messages": [{"role": "system", "content": uPrompt}],
        "max_tokens": 5000,
    }
    HEADERS = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json",
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(DEEPSEEK_URL, headers=HEADERS, json=DATA) as response:
            result = await response.json()
            print("Full API response:", json.dumps(result, indent=2))
            if "error" in result:
                return {"status": "error", "message": f"API error: {result['error']}"}
            try:
                raw_content = result["choices"][0]["message"]["content"]
                print("Raw content from API:", raw_content)

                # Extract code block
                code_match = re.search(r"```python\s*(.*?)\s*```", raw_content, re.DOTALL)
                if code_match:
                    raw_content = code_match.group(1)
                # Extract HTML (match both ''' and """)
                html_match = re.search(r'html\s*=\s*(?:"""|\'\'\')(.*?)(?:"""|\'\'\')', raw_content, re.DOTALL)
                if html_match:
                    html_content = html_match.group(1)
                else:
                    print("Falling back to basic template due to no HTML in response")
                    html_content = f"""
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {{ font-family: Arial, sans-serif; margin: 1in; }}
                            h1 {{ text-align: center; color: #2c3e50; }}
                        </style>
                    </head>
                    <body>
                        <h1>{fullname}</h1>
                        <p>{content.replace('\n', '<br>')}</p>
                    </body>
                    </html>
                    """

                pdf_file = f"{fullname.strip().replace(' ', '_')}_resume.pdf"
                # Specify wkhtmltopdf path if not in PATH (uncomment and adjust if needed)
                # config = pdfkit.configuration(wkhtmltopdf=r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe")
                # pdfkit.from_string(html_content, pdf_file, configuration=config)
                pdfkit.from_string(html_content, pdf_file)  # Use this if wkhtmltopdf is in PATH
                return {"status": "success", "file": pdf_file}

            except (KeyError, ValueError) as e:
                print(f"Error processing response: {e}")
                print("Raw response:", json.dumps(result, indent=2))
                return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    content = (
        "Python Full Stack Developer\n__________________________________________\n\nTECHNICAL SKILLS\n• Languages: Python, JavaScript (ES6+), SQL\n• Frameworks: Django, Flask, React, FastAPI\n• Databases: PostgreSQL, MySQL, MongoDB\n• DevOps: Docker, AWS (EC2/S3/Lambda), CI/CD (Jenkins/GitHub Actions)\n• Tools: Git, REST APIs, GraphQL, Agile/Scrum\n\nPROFESSIONAL EXPERIENCE\nSenior Python Developer | TechSolutions Inc. | 2020-Present\n• Architected 14+ microservices using Django REST Framework, reducing API response time by 52%\n• Led migration of legacy PHP system to Python/Django stack, improving concurrent user capacity 3x\n• Implemented CI/CD pipeline using Docker/Jenkins, cutting deployment time from 2hrs to 25min\n\nFull Stack Developer | HealthFlow Systems | 2017-2020\n• Developed React-based EHR dashboard handling 200k+ daily transactions\n• Optimized PostgreSQL queries for patient analytics cluster, improving report gen speed by 73%\n• Trained 8 junior developers on Python best practices and debugging techniques\n\nEDUCATION\nBSc Computer Science | University of Lagos | 2013-2017\n• Thesis: Predictive maintenance system using Python ML libraries (scikit-learn/Pandas)\n\nCERTIFICATIONS\n• AWS Certified Developer – Associate | 2022\n• Professional Scrum Master I (PSM I) | 2021\n\nPROJECTS\nInventory Management System: Built with Django/React, reduced stock discrepancies by 68% for retail clients\nAutomated Testing Framework: Reduced regression testing time by 55% using Selenium/Behave\n\nKEY METRICS\n• 97% code review pass rate across 150+ PRs\n• 40% faster MVP delivery vs team average\n• 12 production deployments/month managed"
    )
    fullname = "VICTOR CHIBUOGWU CHUKWUEMEKA"
    result = asyncio.run(generate_doc(content, fullname))
    print(result)