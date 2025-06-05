from .celery_config import celery_app

@celery_app.task
def proccess_context_data(data):
    print("Processing job:", data)
    return f"Processed {data}"


# python -m celery -A services.queue.celery_config.celery_app worker --loglevel=info --pool=solo