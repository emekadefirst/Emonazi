import os
import asyncio
import urllib.parse
from bson import ObjectId
import motor.motor_asyncio
from datetime import datetime
from pydantic import EmailStr
from dotenv import load_dotenv


load_dotenv()

MONGO_USER = os.getenv("MONGO_USER")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_CLUSTER = os.getenv("MONGO_CLUSTER")
MONGO_DB = os.getenv("MONGO_DB")

# Encode password (if it contains special characters)
encoded_password = urllib.parse.quote_plus(MONGO_PASSWORD)

# Construct MongoDB URI
MONGO_URI = f"mongodb+srv://{MONGO_USER}:{encoded_password}@{MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)

db = client["emonazi"]
collection = db["EmonaziUser"]

user_types = ["FREE-TIER", "STARTER", "BUSINESS", "ADMIN"]


async def create_user(
    username: str, email: EmailStr, whatsappNumber: int, ipaddress: str
):
    """Creates a new user asynchronously."""
    user_data = {
        "username": username,
        "email": email,
        "whatsappNumber": whatsappNumber,
        "ipaddress": ipaddress,
        "created_at": datetime.utcnow(),
        "user_type": user_types[0],  # Default to FREE-TIER
    }
    try:
        response = await collection.insert_one(user_data)
        user_data["_id"] = str(response.inserted_id)
        return {"message": "User successfully created", "data": user_data}
    except Exception as e:
        return {"message": f"Error in creating user: {e}"}


async def get_user(id: str):
    """Fetches a user by ID asynchronously."""
    try:
        user = await collection.find_one({"_id": ObjectId(id)})
        if user:
            user["_id"] = str(user["_id"])
            return user
        return {"message": "User not found"}
    except Exception as e:
        return {"message": f"Error: {e}"}


async def get_users():
    """Fetches all users asynchronously."""
    try:
        users = []
        async for user in collection.find():
            user["_id"] = str(user["_id"])
            users.append(user)
        return {"users": users}
    except Exception as e:
        return {"message": f"Error: {e}"}


async def update_user(id: str, data: dict):
    """Updates user data asynchronously."""
    try:
        result = await collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.matched_count == 0:
            return {"message": "User not found"}
        return {"message": "User data updated successfully"}
    except Exception as e:
        return {"message": f"Error: {e}"}


async def delete_user(id: str):
    """Deletes a user asynchronously."""
    try:
        result = await collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count != 0:
            return {"message": f"User with id {id} was deleted successfully"}
        return {"message": "User not found"}
    except Exception as e:
        return {"message": f"Error: {e}"}
