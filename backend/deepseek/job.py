import os
import re
import json
import aiohttp
from dotenv import load_dotenv

load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")
DEEPSEEK_URL = os.getenv("DEEPSEEK_URL")

async def jobPrompt(resume_text: str, fullName: str, jobRole: str, applicationDetail: str):
    prompt = f"""
    Your task is to craft a highly targeted and engaging job application package for {fullName}.
    
    **Job Role:** {jobRole}

    **Candidate’s Background:** 
    ----------------------------
    {resume_text}
    ----------------------------

    **Application Context:**
    {applicationDetail}

    **Instructions:**
    - Rewrite the resume to emphasize skills, experience, and achievements most relevant to **{jobRole}**. 
    - Use a **polished, ATS-friendly format**: incorporate keywords from the job role and application context naturally, avoid complex formatting (e.g., tables), and prioritize concise bullet points. Aim for **1-2 pages**, focusing on relevance.
    - Craft a **concise application email (max 150-200 words, 3 paragraphs)** that’s professional yet warm.  
    - Add **subtle, professional-appropriate humor** (e.g., a witty remark about a skill) only if it fits naturally and reflects the candidate’s inferred personality.
    - Maintain a **confident, persuasive tone** to excite the hiring manager about the resume.
    - If resume or application details are incomplete, infer plausible qualifications based on the job role and industry norms.

    **Email Format:**
    - **Intro:** Introduce {fullName}, express enthusiasm for the role, and tie in a detail from `applicationDetail`.  
    - **Middle:** Highlight key, role-relevant qualifications and achievements—keep it engaging and succinct.  
    - **Closing:** End with a polite, compelling call to action (e.g., eager to discuss in an interview).  

    **Final Output:**
    Return a **valid JSON** response in the following structure:

    ```json
    {{
        "Subject": "Email subject line here",
        "cover_letter": "Cover letter content here",
        "resume_content": "Resume content here"
    }}
    ```

    **Rules (Strictly Enforced):**
    - Do **not** include any `<think>` sections, explanations, reasoning, markdown, or extra text outside the JSON.
    - Return **only the valid JSON object** as a single, well-formed string.
    - Ensure the JSON is **directly parseable** with no leading/trailing text or formatting errors.
    -  If you cannot generate the full package, return an empty JSON object (`{{}}`) instead of invalid output.
    """
    return prompt

async def GeneratePrompt(resume_text: str, fullName: str, jobRole: str, applicationDetail: str):
    uPrompt = await jobPrompt(resume_text, fullName, jobRole, applicationDetail)
    DATA = {
        "model": "accounts/fireworks/models/deepseek-r1", 
        "messages": [
            {"role": "system", "content": uPrompt},
            {"role": "user", "content": "Please generate my job application package."}  
        ],
        "max_tokens": 3000  
    }
    HEADERS = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json"
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(DEEPSEEK_URL, headers=HEADERS, json=DATA) as response:  
            result = await response.json()

            try:
                content = result["choices"][0]["message"]["content"]
                json_match = re.search(r'\{.*\}', content, re.DOTALL)
                if json_match:
                    json_str = json_match.group(0)
                    job_package = json.loads(json_str)
                else:
                    raise ValueError("No valid JSON found in response")
                clean_response = json.dumps(job_package, indent=2, ensure_ascii=False)
                return clean_response 
            except (KeyError, json.JSONDecodeError, ValueError) as e:
                return {"Subject": "", "cover_letter": "", "resume_content": ""}
