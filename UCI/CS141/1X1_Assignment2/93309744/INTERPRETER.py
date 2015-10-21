import sys
from tokenizer import Tokenizer

class Interpreter:
    def __init__(self, codefile, infile):
        DATA_SEG_SIZE = 100

        outfile = "{0}.out2".format(codefile)
        self.D = [0 for i in range(DATA_SEG_SIZE)]
        self.PC = 0
        self.input_tokens = iter(open(infile, 'r').read().split('\n'))
        self.outhandle = open(outfile, 'w')
        self.IR=''
        self.run_bit = True

        with open(codefile, 'r') as fread:
            self.C = fread.read().split('\n')

    def runProgram(self):
        #while self.run_bit:
        self.fetch()
        self.execute()
        self.incrementPC()
        pass

    def fetch(self):
        line = self.C[self.PC]
        self.IR = line
        """index = 0
        if line[0] in 'sS':
                self.IR = "set"
                index += 4
        elif line[0] in 'hH':
                self.IR = "halt"
        elif line[0] in 'jJ':
                index += 5
                if line[index] == ' ':
                        self.IR = "jumpt"
                        index += 1
                else:
                        self.IR = "jump"
        else:
                print("Invalid Operation")
        rest = line[index:]
        cmds = str.split(rest, ',')
        for i in range(len(cmds)):
            cmds[i] = str.strip(cmds[i])
        return cmds"""

    def incrementPC(self):
        self.PC = self.PC + 1
        
    def execute(self):
        self.interpretStatement()
        
    # interpretting grammar
    def interpretStatement(self):
        tokens = Tokenizer(self.IR)
        # YOUR CODE HERE
        instr = tokens.next().lower()
        if instr[0] == 's':
            #if instr[4] == ' ':
                #self.interpretJump(tokens)
            #elif instr[4] == 't':
            if self.interpretJumpt(tokens) == True:
                pass
                    #Change PC to jump local
            

    def interpretJumpt(self, tokens):
        while tokens.peek() is not None:
            print(tokens.next())
        value = self.interpretExpr(tokens)
        return value

    def interpretJump(self, tokens):
        pass

    def interpretExpr(self, tokens):
        while tokens.peek() is not None:
            nextToken = tokens.next()
            if nextToken == ',':
                break

    def halt(tokens):
        self.run_bit = False

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
