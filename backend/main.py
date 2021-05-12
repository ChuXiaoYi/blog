from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware

from api.api import api_router

app = FastAPI()
app.include_router(api_router, prefix='/api')

app.add_middleware(SessionMiddleware, **{"secret_key": "cxy", "max_age": 24 * 60 * 60})

if __name__ == '__main__':
    import uvicorn

    uvicorn.run('main:app', reload=True, port=8080)
