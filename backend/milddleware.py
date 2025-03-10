import time
from fastapi import Request, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
from models.user import (
    collection,
    user_types,
)  # Assuming user_types is defined in models.user


class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.rate_limits = {
            user_types[0]: 10,  # FREE-TIER: 10 requests/min
            user_types[1]: 50,  # STARTER: 50 requests/min
            user_types[2]: 100,  # BUSINESS: 100 requests/min
            user_types[3]: None,  # ADMIN: No limit (None means unlimited)
        }
        self.requests = defaultdict(list)
        self.window = 60  # 1-minute window
        self.restricted_paths = {"/jobmail", "/proposalmail"}

    async def dispatch(self, request: Request, call_next):
        user_ip = request.client.host

        # Only apply logic to restricted paths
        if request.url.path in self.restricted_paths:
            if user_ip:
                user_data = collection.find_one(
                    {"ipaddress": user_ip},
                    {"whatsappNumber": 1, "user_type": 1, "_id": 0},
                )

                if (
                    not user_data
                    or "whatsappNumber" not in user_data
                    or not user_data["whatsappNumber"]
                ):
                    return JSONResponse(
                        content={
                            "message": "You don't have an account. Please register."
                        },
                        status_code=status.HTTP_403_FORBIDDEN,
                    )

                user_type = user_data.get("user_type", user_types[0])
                rate_limit = self.rate_limits.get(user_type, 10)

                if rate_limit is None:  # No limit for ADMIN
                    return await call_next(request)

                current_time = int(time.time())
                self.requests[user_ip] = [
                    t for t in self.requests[user_ip] if current_time - t < self.window
                ]

                if len(self.requests[user_ip]) >= rate_limit:
                    return JSONResponse(
                        content={
                            "message": f"Rate limit exceeded for {user_type}. Please try again later."
                        },
                        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    )

                self.requests[user_ip].append(current_time)
        return await call_next(request)
