import peewee

from db.database import Base


class Post(Base):
    title = peewee.CharField(verbose_name="文章标题")
    content = peewee.TextField(verbose_name="文章内容")
    tags = peewee.CharField(verbose_name="标签")  # 1,2,3
    star = peewee.IntegerField(verbose_name="点赞")
    favorites = peewee.IntegerField(verbose_name="收藏")

    category_id = peewee.IntegerField(verbose_name="分类")
    user_id = peewee.IntegerField(verbose_name="作者id")

    class Meta:
        table_name = 'post'


class Comment(Base):
    content = peewee.TextField(verbose_name="评论内容")
    post_id = peewee.IntegerField(verbose_name="文章id")
    comment_id = peewee.IntegerField(verbose_name="回复评论id")


class User(Base):
    avatar = peewee.TextField(verbose_name="头像")
    name = peewee.CharField(verbose_name="名称")
    email = peewee.CharField(verbose_name="邮箱")

    source = peewee.SmallIntegerField(verbose_name="登录来源：0 普通登录 1 git")
    source_user_id = peewee.BigIntegerField(verbose_name="登录来源的用户id")
