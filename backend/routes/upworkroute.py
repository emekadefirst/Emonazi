from fastapi import APIRouter
from pydantic import BaseModel
from fastapi import status, Depends
from fastapi.responses import JSONResponse
from deepseek.upwork import GenerateApplication

upwork = APIRouter()


class Proposal(BaseModel):
    description: str


@upwork.post("/proposal")
async def create(data: Proposal =  Depends()):
    try:
        response = await GenerateApplication(data.description)
        return JSONResponse(
            content={"message": response},
            status_code=status.HTTP_201_CREATED,
        )
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
