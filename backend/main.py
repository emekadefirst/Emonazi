from fastapi import FastAPI, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Emonazi AI",
    description="An LLM powered AI that generates unqiue cover_letter, resume, proposal etc for business owners, contractors and freelances",
    version="1.0.0",
    contact="emekadefirst@gmail.com"
)

async def main():
    return JSONResponse("You now have access to our platform")