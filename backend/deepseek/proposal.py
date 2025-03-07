import os
import re
import json
import aiohttp
from dotenv import load_dotenv

load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")
DEEPSEEK_URL = os.getenv("DEEPSEEK_URL")

async def proposalPrompt(companyName: str, ceo: str, location: str, about: str):
    prompt = f"""
    Your task is to compose a concise, engaging cold email proposing services to {companyName}. The email should be professional, straight-to-the-point, and designed to prompt a response from the recipient.

    **Company Details:**
    - **Name:** {companyName}
    - **CEO:** {ceo}
    - **Location:** {location}
    - **About:** {about}

    **Instructions:**
    - Address the email to {ceo}, the CEO of {companyName}.
    - Keep the email **concise (100-150 words, 2-3 paragraphs)**, avoiding fluff or over-formality.
    - Make it **engaging**: Start with a hook that ties into {companyName}’s industry or {about} to grab attention.
    - Clearly state the **service offering**: Highlight a specific value proposition (e.g., boosting efficiency, driving growth, solving a pain point inferred from {about}).
    - Use a **confident, friendly tone** with a subtle touch of personality (e.g., a light remark or relatable benefit).
    - End with a **direct call-to-action**: Invite a quick reply or call to discuss further, making it easy for {ceo} to respond.
    - Include a **subject line** that’s catchy yet professional, tailored to {companyName}.

    **Final Output:**
    Return a **valid JSON** response in the following structure:

    ```json
    {{
        "Subject": "Subject line here",
        "email_content": "Email body here"
    }}
    ```

    **Rules:**
    - ❌ Do **not** include reasoning, `<think>` tags, markdown, or extra text outside the JSON.
    - ✅ Return **only the valid JSON object**, ensuring it’s parseable and concise.
    """
    return prompt
async def GeneratePrompt(companyName: str, ceo: str, location: str, about: str):
    uPrompt = await proposalPrompt(companyName, ceo, location , about)
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
