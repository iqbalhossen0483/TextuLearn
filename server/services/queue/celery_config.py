from celery import Celery
from config.settings import Config

def make_celery():
    celery_app = Celery(
        'book_agent_celery',
        broker=Config.CELERY_BROKER_URL,
        backend=Config.CELERY_RESULT_BACKEND,
        include=['services.queue.tasks'],
    )
    celery_app.conf.update(
        task_track_started=True,
        task_serializer='json',
        result_serializer='json',
        accept_content=['json'],
        timezone='UTC',
        enable_utc=True,
    )
    return celery_app

celery_app = make_celery()
