from fastapi import APIRouter
from pydantic import BaseModel
from fastapi import status
from fastapi.responses import JSONResponse
from deepseek.proposal import GenerateApplicaton

proposal = APIRouter(
    tags=["proposal path"] 
)

class Proposal(BaseModel):
    companyName: str
    ceo: str
    location: str
    about: str

@proposal.post("/proposalmail/")
async def create(data: Proposal):
    try:
        response = await GenerateApplicaton(data.companyName, data.ceo, data.location, data.about)
        return JSONResponse(
            content={"message": "Application generated successfully", "data": response},
            status_code=status.HTTP_201_CREATED
        )
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
