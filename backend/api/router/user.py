import json
import os

import requests
from fastapi import APIRouter, Query
from fastapi.requests import Request
from fastapi.responses import RedirectResponse
from playhouse.shortcuts import dict_to_model, model_to_dict

from db.model import User
from config import Config

router = APIRouter()


@router.get('/login')
def get_user(request: Request, code: str = Query(None)):

    if code:
        post_data = dict(
            client_id=Config.CLIENT_ID,
            client_secret=Config.CLIENT_SECRET,
            code=code
        )
        headers = {
            'Accept': 'application/json'
        }
        url = f"https://github.com/login/oauth/access_token"
        resp = requests.post(url, data=post_data, headers=headers).json()

        current_user = {}
        if resp.get('access_token'):
            user_info = requests.get(
                'https://api.github.com/user',
                headers={"Authorization": f"Bearer {resp['access_token']}"}
            ).json()
            user, is_create = User.get_or_create(**{
                'defaults': {
                    "name": user_info['login'],
                    "avatar": user_info['avatar_url'],
                    "email": user_info['email'],
                    "source": 1
                },
                'source_user_id': user_info['id']
            })
            current_user = model_to_dict(user)
            request.session['current_user'] = current_user

            return RedirectResponse(request.headers.get('referer'))
        else:
            return {
                "code": -1,
                "data": current_user,
                "msg": "登录失败"
            }
    current_user = request.session.get('current_user')
    url = f"https://github.com/login/oauth/authorize?client_id=bf0930fac1986f22d9f2&redirect_uri={request.url}"
    return {
        'code': 0,
        'data': {
            "current_user": current_user,
            "url": None if current_user else url
        }
    }


@router.get('/logout')
def logout(request: Request):
    request.session['current_user'] = None
    return {
        "code": 0,
        "msg": "退出登录"
    }
