import uvicorn
from milddleware import RateLimitMiddleware
from fastapi import FastAPI
from routes.jobroute import job
from routes.userroute import user
from routes.proposalroute import proposal
from fastapi.responses import JSONResponse
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Emonazi AI",
    description="An LLM-powered AI that generates unique cover letters, resumes, proposals, etc., for business owners, contractors, and freelancers.",
    version="1.0.0",
    contact={"email": "emekadefirst@gmail.com"}
)

app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(RateLimitMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(job)
app.include_router(user)
app.include_router(proposal)


@app.get("/")
async def main():
    return JSONResponse("You now have access to our platform")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
