import sys
from tokenizer import Tokenizer

class Interpreter:
    def __init__(self, codefile, infile):
        DATA_SEG_SIZE = 100

        outfile = "{0}.out".format(codefile)
        self.D = [0 for i in range(DATA_SEG_SIZE)]
        self.PC = 0
        self.input_tokens = iter(open(infile, 'r').read().split('\n'))
        self.outhandle = open(outfile, 'w')
        self.IR=''
        self.run_bit = True

        with open(codefile, 'r') as fread:
            self.C = fread.read().split('\n')

    def runProgram(self):
        while self.run_bit:
            pass
        pass

    def fetch(self):
        pass

    def incrementPC(self):
        pass

    def execute(self):
        pass

    # interpretting grammar
    def interpretStatement(self):
        tokens = Tokenizer(self.IR)
        # YOUR CODE HERE
        pass

    def interpretJump(self, tokens):
        value = self.interpretExpr(tokens)
        return value

    def interpretJumpt(self, tokens):
        pass

    def interpretExpr(self, tokens):
        pass

    def halt(tokens):
        pass

    def printDataSeg(self):
        # DO NOT CHANGE
        self.outhandle.write("Data Segment Contents\n")
        for i in range(len(self.D)):
            self.outhandle.write('{0}: {1}\n'.format(i, self.D[i]))

    # read in value from file
    # DO NOT CHANGE
    def read(self):
        return self.input_tokens.next()

    # write out the file
    # DO NOT CHANGE
    def write(self, value):
        self.outhandle.write('{0}\n'.format(value))

def main():
    if len(sys.argv) != 3:
        print "Wrong usage: python interpreter.py <programfile> <inputfile>"
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
