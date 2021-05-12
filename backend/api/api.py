from fastapi import APIRouter

from api.router import post, user

api_router = APIRouter()
api_router.include_router(post.router, prefix='/post', tags=['文章'])
api_router.include_router(user.router, prefix='/user', tags=['用户'])
