from fastapi import APIRouter, File, UploadFile, Depends
from pydantic import BaseModel
from fastapi import status
from fastapi.responses import JSONResponse
from deepseek.job import GenerateApplicaton

job = APIRouter(
    tags=["Job path"] 
)

class Hunter(BaseModel):
    fullname: str
    role: str
    application_detail: str

@job.post("/jobmail/")
async def upload_data(resume: UploadFile = File(...), data: Hunter = Depends()):
    try:
        resume_content = await resume.read()
        fullname = data.fullname
        role = data.role
        application_detail = data.application_detail

        response = await GenerateApplicaton(resume_content, fullname, role, application_detail)

        return JSONResponse(
            content={"message": "Application generated successfully", "data": response},
            status_code=status.HTTP_201_CREATED
        )
    
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
