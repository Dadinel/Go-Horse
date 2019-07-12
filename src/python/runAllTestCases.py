import os
import sys
import json
import subprocess

def isTestingThisSource():
    return True

def getJsonExample():
    #OK
    return '{"tests":{"classname":"FWAdvplParserTestCase","coverage":null,"methods":[{"line":-1,"message":"","methodname":"SetUpClass","skiped":false,"success":true},{"line":-1,"message":"","methodname":"SetUp001","skiped":false,"success":true},{"line":-1,"message":"","methodname":"TearDown001","skiped":false,"success":true},{"line":-1,"message":"","methodname":"BasicExp","skiped":false,"success":true},{"line":-1,"message":"","methodname":"SetUp002","skiped":false,"success":true},{"line":-1,"message":"","methodname":"TearDown002","skiped":false,"success":true},{"line":-1,"message":"","methodname":"BinExp1","skiped":false,"success":true},{"line":-1,"message":"","methodname":"SetUp003","skiped":false,"success":true},{"line":-1,"message":"","methodname":"TearDown003","skiped":false,"success":true},{"line":-1,"message":"","methodname":"ComplexExp","skiped":false,"success":true},{"line":-1,"message":"","methodname":"SetUp004","skiped":false,"success":true},{"line":-1,"message":"","methodname":"TearDown004","skiped":false,"success":true},{"line":-1,"message":"","methodname":"WrogExp","skiped":false,"success":true},{"line":-1,"message":"","methodname":"SetUp005","skiped":false,"success":true},{"line":-1,"message":"","methodname":"TearDown005","skiped":false,"success":true},{"line":-1,"message":"","methodname":"AvalLit","skiped":false,"success":true},{"line":-1,"message":"","methodname":"TearDownClass","skiped":false,"success":true}],"runned":true}}'

    #Meio ruim
    #return '{"tests":{"classname":"FWAdvplParserTestCase","coverage":null,"methods":[{"line":-1,"message":"","methodname":"SetUpClass","skiped":false,"success":false},{"line":-1,"message":"","methodname":"SetUp001","skiped":false,"success":true},{"line":-1,"message":"","methodname":"TearDown001","skiped":false,"success":false},{"line":-1,"message":"","methodname":"BasicExp","skiped":false,"success":true},{"line":-1,"message":"","methodname":"SetUp002","skiped":false,"success":true},{"line":-1,"message":"","methodname":"TearDown002","skiped":false,"success":true},{"line":-1,"message":"","methodname":"BinExp1","skiped":false,"success":true},{"line":-1,"message":"","methodname":"SetUp003","skiped":false,"success":true},{"line":-1,"message":"","methodname":"TearDown003","skiped":false,"success":true},{"line":-1,"message":"","methodname":"ComplexExp","skiped":false,"success":true},{"line":-1,"message":"","methodname":"SetUp004","skiped":false,"success":true},{"line":-1,"message":"","methodname":"TearDown004","skiped":false,"success":false},{"line":-1,"message":"","methodname":"WrogExp","skiped":false,"success":true},{"line":-1,"message":"","methodname":"SetUp005","skiped":false,"success":true},{"line":-1,"message":"","methodname":"TearDown005","skiped":false,"success":true},{"line":-1,"message":"","methodname":"AvalLit","skiped":false,"success":false},{"line":-1,"message":"","methodname":"TearDownClass","skiped":false,"success":false}],"runned":true}}'

    #Quebrado
    #return '{"tests":{"classname":"FWAdvplParserTestCase","coverage":null,"methods":[{"line":-1,"message":"","methodname":"SetUpClass","skiped":false,"success":false},{"line":-1,"message":"","methodname":"SetUp001","skiped":false,"success":false},{"line":-1,"message":"","methodname":"TearDown001","skiped":false,"success":false},{"line":-1,"message":"","methodname":"BasicExp","skiped":false,"success":false},{"line":-1,"message":"","methodname":"SetUp002","skiped":false,"success":false},{"line":-1,"message":"","methodname":"TearDown002","skiped":false,"success":false},{"line":-1,"message":"","methodname":"BinExp1","skiped":false,"success":false},{"line":-1,"message":"","methodname":"SetUp003","skiped":false,"success":false},{"line":-1,"message":"","methodname":"TearDown003","skiped":false,"success":false},{"line":-1,"message":"","methodname":"ComplexExp","skiped":false,"success":false},{"line":-1,"message":"","methodname":"SetUp004","skiped":false,"success":false},{"line":-1,"message":"","methodname":"TearDown004","skiped":false,"success":false},{"line":-1,"message":"","methodname":"WrogExp","skiped":false,"success":false},{"line":-1,"message":"","methodname":"SetUp005","skiped":false,"success":false},{"line":-1,"message":"","methodname":"TearDown005","skiped":false,"success":false},{"line":-1,"message":"","methodname":"AvalLit","skiped":false,"success":false},{"line":-1,"message":"","methodname":"TearDownClass","skiped":false,"success":false}],"runned":true}}'

    #Error
    #return '{xisto: false}'

def getPathTests():
    if len(sys.argv) > 1:
        return sys.argv[1]
    else:
        return '/home/danielmendes/totvs/framework/AdvplFramework/test/'

def getAllTestCases():
    files = []
    # r=root, d=directories, f = files
    for r, d, f in os.walk(path):
        for file in f:
            if '.pr' in file.lower():
                files.append(os.path.join(r, file))

    return files

def getJsonTestCase(testCase):
    jsonResult = None

    try:
        jsonResult = json.loads(testCase)
    except:
        jsonResult = None

    return jsonResult

def getResultTestCase(testCase):
    # p = subprocess.Popen("echo Daniel", stdout=subprocess.PIPE, shell=True)
    # (output, err) = p.communicate()
    # p_status = p.wait()
    # print("Command output : ", output)
    # print("Command exit status/return code : ", p_status)

    #Rodar o comando do Rodrigo, remover o echo...
    output = subprocess.run(['echo', testCase], stdout=subprocess.PIPE)
    return output.stdout.decode('windows-1252').strip()

def validResultTestCase(sourceCode, resultTestCase, successful, halfAssed, broke):
    if resultTestCase == None or not resultTestCase['tests']['runned']:
        broke.append(sourceCode)
    else:
        errors = getInvalidTests(resultTestCase['tests']['methods'])
        size = len(resultTestCase['tests']['methods'])

        if errors == 0:
            successful.append(sourceCode)
        elif errors == size:
            broke.append(sourceCode)
        else:
            halfAssed.append(sourceCode)

def validResults(filesTestCase, successful, halfAssed, broke):
    if isTestingThisSource():
        #Trecho para testes
        resultTestCase = getJsonTestCase(getResultTestCase(getJsonExample()))

        if resultTestCase == None:
            sourceCode = "Error"
        else:
            sourceCode = resultTestCase['tests']['classname']

        validResultTestCase(sourceCode, resultTestCase, successful, halfAssed, broke)
    else:
        for sourceCode in filesTestCase:
            resultTestCase = getJsonTestCase(getResultTestCase(sourceCode))
            validResultTestCase(sourceCode, resultTestCase, successful, halfAssed, broke)

def getInvalidTests(methods):
    invalids = 0

    for test in methods:
        if not test['success'] and not test['skiped']:
            invalids += 1

    return invalids
    
def printAllResults(successful, halfAssed, broke):
    print("\n")
    print("Successful:")
    print(successful)
    print("\n")
    print("Half-assed:")
    print(halfAssed)
    print("\n")
    print("Broke:")
    print(broke)

if __name__ == "__main__":
    jsons = []
    successful = []
    halfAssed = []
    broke = []

    path = getPathTests()
    filesTestCase = getAllTestCases()
    validResults(filesTestCase, successful, halfAssed, broke)
    printAllResults(successful, halfAssed, broke)