import os
import peewee
from playhouse.pool import PooledMySQLDatabase

from config import Config

db = PooledMySQLDatabase(
    database=Config.DB_NAME,
    max_connections=8,
    stale_timeout=300,
    user=Config.DB_USER,
    password=Config.DB_PASSWORD,
    host=Config.DB_HOST,
    port=3306
)


class Base(peewee.Model):
    id = peewee.IntegerField(index=True)

    class Meta:
        database = db