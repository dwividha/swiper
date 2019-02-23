
from collections import namedtuple

def getNumWords(text):
    return len(text.split())

def getNumElements(l):
    return len(l)


# you can append many more feature engineering processors over here
processors = []
Processsor = namedtuple("Processor", "operation field outputField")
processors.append(Processsor(getNumWords, "Bio", "wordsInBio"))
processors.append(Processsor(getNumElements, "PhotoURLs", "numPhotos"))
processors.append(Processsor(getNumElements, "InstagramPhotos", "numInstagramPhotos"))

def process(req):
    for processor in processors:
        req[processor.outputField] = processor.operation(req[processor.field])
    return req
