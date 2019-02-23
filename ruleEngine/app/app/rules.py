from collections import namedtuple

'''
you can make new rules by creating new operations here for example for an ML model that does binary predictions, you can 
score with the model and check if the score if above/below the threshold and give the return value accordingly
'''

def greaterThan(a, b):
    return a>b


def lessThan(a,b):
    return a<b

def equalTo(a,b):
    return a==b

Rule = namedtuple('Rule', 'field operation value')

rules = []

rules.append(Rule("Age", greaterThan, 18))
rules.append(Rule("Age", lessThan, 24))
rules.append(Rule("wordsInBio", greaterThan, 5))



def runRequestThroughRules(req):
    allGood = True
    for rule in rules:
        op = rule.operation
        field = rule.field
        value = rule.value
        if not op(req[field], value):
            allGood = False
            break
    return allGood