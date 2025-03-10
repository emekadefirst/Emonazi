from fastapi import APIRouter
from fastapi import status, responses, Request
from pydantic import BaseModel, EmailStr
from models.user import create_user, get_user, get_users, update_user, delete_user

class User(BaseModel):
    username: str
    email: EmailStr
    whatsappNumber: int

user = APIRouter(tags=["User path"])


@user.post("/users")
async def create(data: User, meta: Request):
    forwarded = meta.headers.get("X-Forwarded-For")
    ip = forwarded.split(",")[0] if forwarded else meta.client.host
    user = await create_user(username=data.username, email=data.email, whatsappNumber=data.whatsappNumber, ipaddress=ip)
    if user:
        return responses.ORJSONResponse(
            content={"message": user},
            status_code=status.HTTP_201_CREATED
        )
    return responses.ORJSONResponse(
    content={"message": user},
    status_code=status.HTTP_400_BAD_REQUEST
)


@user.get("/users")
async def all_user():
    users = await get_users()
    if users:
        return responses.ORJSONResponse(
            content={"message": users}, status_code=status.HTTP_200_OK
        )
    return responses.ORJSONResponse(
        content={"message": users}, status_code=status.HTTP_404_NOT_FOUND
    )


@user.get("/users/{id}")
async def user_by_id(id: str):
    user = await get_user(id)
    if user:
        return responses.ORJSONResponse(
            content={"message": user}, status_code=status.HTTP_201_CREATED
        )
    return responses.ORJSONResponse(
        content={"message": user}, status_code=status.HTTP_404_NOT_FOUND
    )

@user.patch("/users/{id}")
async def update(id: str, data: User):
    user_data = {
        "username": data.username,
        "email": data.email,
        "whatsappNumber": data.whatsappNumber
    }
    reponse = await update_user(id, user_data)
    if reponse:
        return responses.ORJSONResponse(
            content={"message": reponse}, status_code=status.HTTP_201_CREATED
        )
    return responses.ORJSONResponse(
        content={"message": reponse}, status_code=status.HTTP_404_NOT_FOUND
    )

@user.delete("/users/{id}")
async def delete(id: str):
    user = await delete_user(id)
    if user:
        return responses.ORJSONResponse(
            content={"message": user}, status_code=status.HTTP_204_NO_CONTENT
        )
    return responses.ORJSONResponse(
        content={"message": user}, status_code=status.HTTP_404_NOT_FOUND
    )
