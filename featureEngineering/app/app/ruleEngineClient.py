import requests
import json
from app import config


def run(data):
    response = requests.post(config.ruleEngineClientURL, json.dumps(data))
    return json.loads(response.text)
