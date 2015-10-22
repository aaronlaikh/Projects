import sys
import re
from tokenizer import Tokenizer

class Interpreter:
    def __init__(self, codefile, infile):
        DATA_SEG_SIZE = 100

        outfile = "{0}.out2".format(codefile)
        self.D = [0 for i in range(DATA_SEG_SIZE)]
        self.PC = 0
        self.input_tokens = iter(open(infile,'r').read().split('\n'))
        self.outhandle = open(outfile, 'w')
        self.IR=''
        self.run_bit = True

        with open(codefile, 'r') as fread:
            self.C = fread.read().split('\n')

    def runProgram(self):
        while self.run_bit:
            self.fetch()
            self.incrementPC()
            self.execute()
        pass

    def fetch(self):
        line = self.C[self.PC]
        self.IR = line

    def incrementPC(self):
        self.PC = self.PC + 1
        
    def execute(self):
        self.interpretStatement()
        
    # interpretting grammar
    def interpretStatement(self):
        tokens = Tokenizer(self.IR)
        instr = tokens.next().lower()
        stmt = ""
        while tokens.peek() is not None:
            stmt += tokens.next()
        if instr[0] == 's':
            self.interpretSet(stmt)
        elif instr[0] == 'j':
            if len(instr) == 5:
                self.interpretJumpt(stmt)
            elif len(instr) == 4:
                self.interpretJump(stmt)
        elif instr[0] == 'h':
            self.halt(tokens)
            
    def interpretSet(self, stmt):
        split = str.split(stmt, ',')
        dest = None
        src = None
        if split[1][0] == 'r':
            src = self.read()
        else:
            src = self.interpretExpr(split[1])
            
        if split[0][0] == 'w':
            self.write(src)
        else:
            dest = self.interpretExpr(split[0])
            self.D[dest] = src
    
    def interpretJumpt(self, stmt):
        split = str.split(stmt, ',')
        dest = self.interpretExpr(split[0])
        boolCondition = False
        conds = []
        if "==" in split[1]:
            conds = str.split(split[1], "==")
            cond1 = self.interpretExpr(conds[0])
            cond2 = self.interpretExpr(conds[1])
            boolCondition = cond1 == cond2
        elif "!=" in split[1]:
            conds = str.split(split[1], "!=")
            cond1 = self.interpretExpr(conds[0])
            cond2 = self.interpretExpr(conds[1])
            boolCondition = cond1 != cond2
        elif ">=" in split[1]:
            conds = str.split(split[1], ">=")
            cond1 = self.interpretExpr(conds[0])
            cond2 = self.interpretExpr(conds[1])
            boolCondition = cond1 >= cond2
        elif "<=" in split[1]:
            conds = str.split(split[1], "<=")
            cond1 = self.interpretExpr(conds[0])
            cond2 = self.interpretExpr(conds[1])
            boolCondition = cond1 <= cond2
        elif "<" in split[1]:
            conds = str.split(split[1], "<")
            cond1 = self.interpretExpr(conds[0])
            cond2 = self.interpretExpr(conds[1])
            boolCondition = cond1 < cond2
        elif ">" in split[1]:
            conds = str.split(split[1], ">")
            cond1 = self.interpretExpr(conds[0])
            cond2 = self.interpretExpr(conds[1])
            boolCondition = cond1 > cond2
        if boolCondition:
            self.PC = dest

    def interpretJump(self, stmt):
        dest = self.interpretExpr(stmt)
        self.PC = dest

    def interpretExpr(self, expr):
        add = True
        exprsum = 0
        if "-" in expr:
            add = False
        split = re.split("[+|-]+", expr, 1)
        exprsum = self.interpretTerms(split[0])
        if len(split) > 1:
            if add == True:
                exprsum += self.interpretExpr(split[1])
            else:
                exprsum -= self.interpretExpr(split[1])
        return exprsum
    
    def interpretTerms(self, terms):
        op = False
        sign = 0
        prod = 0
        startIndex = 0
        closeIndex = 0
        paren = False
        temp=""
        if "(" in terms:
            startIndex = terms.find("(")
            closeIndex = terms.rfind(")")
            paren = True
            temp = terms[startIndex+1:closeIndex]
            terms = terms.replace(temp, "")
        if "*" in terms:
                op = True
                sign = 0
        elif "/" in terms:
                op = True
                sign = 1
        elif "%" in terms:
                op = True
                sign = 2
        split = re.split("[*|/|%]+", terms, 1)
        for i in range(len(split)):
            strings = split[i]
            if "(" in strings:
                parenindex = strings.find("(")
                split[i] = strings[:parenindex+1] + temp + strings[parenindex+1:]
        prod = self.interpretFactors(split[0])
        if len(split) > 1:
            if  op == True:
                if sign == 0:
                    prod = prod * self.interpretFactors(split[1])
                elif sign == 1:
                    prod = prod / self.interpretFactors(split[1])
                elif sign == 2:
                    prod = prod % self.interpretFactors(split[1])
        return prod

    def interpretFactors(self, factors):
        num = 0
        if factors[0] == "D" and factors[1] == "[":
            newExpr = factors[2:len(factors)-1]
            num = self.D[self.interpretExpr(newExpr)]
        elif factors[0] == "(":
            newExpr = factors[1:len(factors)-1]
            num = self.interpretExpr(newExpr)
        else:
            num = self.interpretNumbers(factors)
        return int(num)

    def interpretNumbers(self, numbers):
        num = 0
        try:
            num = int(numbers)
        except:
            num = 0
        return num
    
    def halt(self,tokens):
        self.run_bit = False

    def printDataSeg(self):
        # DO NOT CHANGE
        self.outhandle.write("Data Segment Contents\n")
        for i in range(len(self.D)):
            self.outhandle.write('{0}: {1}\n'.format(i, self.D[i]))

    # read in value from file
    # DO NOT CHANGE
    def read(self):
        #return self.input_tokens.next()
        return next(self.input_tokens)

    # write out the file
    # DO NOT CHANGE
    def write(self, value):
        self.outhandle.write('{0}\n'.format(value))

def main():
    if len(sys.argv) != 3:
        print("Wrong usage: python interpreter.py <programfile> <inputfile>")
        sys.exit(0)

    codepath = sys.argv[1]
    inputpath = sys.argv[2]

    # init the interpreter
    interpreter = Interpreter(codepath, inputpath)

    # running the program
    interpreter.runProgram()

    # print out the data segment
    interpreter.printDataSeg()

if __name__ == "__main__":
    main()
