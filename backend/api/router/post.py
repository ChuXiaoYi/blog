from fastapi import APIRouter

router = APIRouter()


@router.get('')
def get_post_list():
    return {
        'data': []
    }
