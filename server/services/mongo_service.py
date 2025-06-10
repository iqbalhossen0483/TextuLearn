from pymongo import MongoClient
from config.settings import Config

class MongoService:
    def __init__(self):
        self.client = MongoClient(Config.MONGO_URL)
        self.db = self.client.get_default_database()

    def get_collection(self, collection_name):
        return self.db[collection_name]
