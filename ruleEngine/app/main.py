from flask import Flask, request, jsonify
from app import rules
import logging

app = Flask(__name__)

@app.route("/")
def helloWorld():
    return "HelloWorld!"

@app.route("/shouldSwipe", methods=['POST'])
def swipeOrNot():
    reqJson = request.get_json(force=True)
    rulesSatisfied = None
    try:
        rulesSatisfied = rules.runRequestThroughRules(reqJson)
    except Exception as e:
        logging.error("encountered error with request {} : {}".format(str(reqJson), str(e)))
        return jsonify(
            {
                "success" : False,
                "error" : str(e)
            }
        )
    return jsonify(
        {
            "success" : True,
            "rulesSatisfied" : rulesSatisfied
        }
    )


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)