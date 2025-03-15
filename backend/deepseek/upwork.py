import aiohttp
import os
import re
import json
from dotenv import load_dotenv

load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")
DEEPSEEK_URL = os.getenv("DEEPSEEK_URL")




async def GeneratePrompt(description: str):
    prompt = f"""
    Consider yourself as a freelancer, compose an Upwork proposal that is convincing,
    catchy, straight to the point, and exudes assurance, engagement, and a response-triggering tone
    for the job description: '{description}'. The output must be plain text only, no <think> tags,
    no reasoning, no markdown, no extra formatting, just the proposal text exactly as follows:

    Hello,

    Are you tired of manually sifting through endless videos to find the right content? Struggling with unreliable scripts that miss critical data? I’ve built Selenium automation solutions tailored for keyword-driven scraping, and I can deliver a script that precisely targets US-based videos over 3 minutes using your exact keywords (“Tired of,” “Frustrated with,” etc.).

    My scripts are built for accuracy—geolocation filters, duration checks, and real-time error handling ensure you get consistent results. Let’s automate this in 3 days or less, so you never have to waste time on manual searches again.

    Ready to solve this? I’m here to discuss specifics and start immediately.

    Best regards,
    [Your Name]
    """
    return prompt


async def GenerateApplication(description: str):
    uPrompt = await GeneratePrompt(description)
    DATA = {
        "model": "accounts/fireworks/models/deepseek-r1",
        "messages": [
            {"role": "system", "content": uPrompt},
            {"role": "user", "content": "Generate Upwork proposal."},
        ],
        "max_tokens": 3000,
    }
    HEADERS = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json",
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(DEEPSEEK_URL, headers=HEADERS, json=DATA) as response:
            result = await response.json()
            try:
                content = result["choices"][0]["message"]["content"]
                # print("Raw content from API:", content)  # Debug output
                # Remove <think> tags and their content
                clean_response = re.sub(
                    r"<think>.*?</think>", "", content, flags=re.DOTALL
                )
                # Strip any remaining whitespace
                clean_response = clean_response.strip()
                return clean_response
            except (KeyError, ValueError) as e:
                return f"Error processing response: {e}"


# async def main():
#     description = "i am looking for a selenium expert who can setup a script that will work on I have keywords like the following 'Struggling with' 'Tired of' 'Sick of' 'Frustrated with' 'Does this sound like you?' and want to be able to find videos that are longer than 3mins and are in the USA following each keyword"
#     result = await GenerateApplication(description)
#     print(result)

# import asyncio
# asyncio.run(main())
