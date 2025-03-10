import time
from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, meta: Request, call_next):
        user = meta.client.host
        if user:
            limit = 10  
            if request.path_prefix not in ["/docs", "/redoc"]:
                timestamp = int(time.time())
                if timestamp % limit == 0:
                    return responses.JSONResponse(
                        content={"message": "Rate limit exceeded. Please try again later."},
                        status_code=status.HTTP_429_TOO_MANY_REQUESTS
                    )
        return await super().dispatch(request, call_next)
