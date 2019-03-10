from bson import ObjectId
from flask import Flask, request, jsonify
from app import config, ruleEngineClient, processor
# import logging as log
from pymongo import MongoClient

app = Flask(__name__)

print("connecting to db client")
client = MongoClient(
    'db',
    config.mondoDBServerPort, connect=False)
db = client["swipedb"]
print("connected to db client")


def putDataInDb(reqJson):
    db.bioInfo.insert_one(reqJson)

@app.route("/")
def helloWorld():
    return "HelloWorld!"

@app.route("/shouldSwipe", methods=['POST'])
def swipeOrNot():
    reqJson = request.get_json(force=True)
    isRightSwipe = None
    try:
        print("putting data into db")
        putDataInDb(reqJson)
        print("starting featurization")
        reqJson = {key: value for key, value in reqJson.items() if key != "_id"}
        processedJson = processor.process(reqJson)
        print("finished featurization : " + str(processedJson))
        ruleEngineResponse = ruleEngineClient.run(processedJson)
        print("finished rule engine execution : " + str(isRightSwipe))

        #directly return the error from downstream if it has errored out
        if ruleEngineResponse["success"] is False:
            return ruleEngineResponse
        isRightSwipe = ruleEngineResponse["rulesSatisfied"]

    except Exception as e:
        print("error occurred during processing of request: {}".format(str(reqJson)))
        response = {
            "success" : False,
            "error" : str(e)
        }
        return jsonify(response)
    response = None

    response =  {
        "success" : True,
        "shouldSwipe" : isRightSwipe
    }
    return jsonify(response)

@app.route('/getAllData', methods=['GET'])
def getAllData():
    try:
        cursor = db.bioInfo.find({},{'_id': False})
        result = [dict(y) for y in cursor]
    except Exception as e:
        print("exception occured : " + str(e))
    return jsonify(result)



if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8080)