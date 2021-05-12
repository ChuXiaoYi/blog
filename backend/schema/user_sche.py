from pydantic import BaseModel
from fastapi import Body


class GithubLogin(BaseModel):
    code: str = Body(...)
