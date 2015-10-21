import sys
import string
import re

class Lexor:
	index = -1
	"""
                Initialize Lexor by calling to save file data to itself.
        """
	def __init__(self, inputFile):
		self.filename = inputFile
		self.openFile()
	"""
                Open input file, read() to get all text data, then
                split by each line.
                Splits are done on \r\n, \t\n, and \n.
        """
	def openFile(self):
		with open(self.filename) as stmts:
			delimiters = "[\r\n|\t\n|\n]+"
			self.data = re.split(delimiters, stmts.read())
	"""
                Advance to the next token (next line/statement).
        """
	def next(self):
		self.index += 1
		info = self.data[self.index]
		return info
	"""
                Look at next token, but don't advance.
                If there is no other token, return empty string.
        """
	def peek(self):
		try:
			return self.data[self.index+1]
		except IndexError:
			return ''
	
def parseProgram(inputFile):
        """
        Begin the program.
        Sends input filepath to parseStatments to create Lexor.
        """
        print("Program")
        parseStatements(inputFile)

def parseStatements(inputFile):
        """
        Parse statements.
        Create a Lexor object, that grabs and calls to parse next statement
        if another statement exists.
        """
        lex = Lexor(inputFile)
        while lex.peek() != '':
                parseStmt(lex.next())
	
def parseStmt(line):
        """
        Parse the instruction of the statement.
        If 's', then Set.  if 'h', then Halt.
        If 'j', and 6th index is ' ', then jumpt.
        If 'j', and 6th index is not ' ', then jump.
        Else, print invalid operation.
        For each case, statement is split using ',' as delimiter.
        whitespace ignored, will be stripped further down.
        """
        print("Statement")
        index=0
        if line[0] == 's':
                print("Set")
                index += 4
                rest = line[index:]
                cmds = str.split(rest, ',')
                parseSet(cmds)
        elif line[0] == 'h':
                exit()
        elif line[0] == 'j':
                index += 5
                if line[index] == ' ':
                        print("Jumpt")
                        index += 1
                        rest = line[index:]
                        cmds = str.split(rest, ',')
                        parseJumpt(cmds)
                else:
                        print("Jump")
                        rest = line[index:]
                        cmds = str.split(rest, ',')
                        parseJump(cmds)
        else:
                print("Invalid Operation")

	
def parseSet(cmds):
        """
        parse Set command.
        set (write|<Expr>), (read|<Expr>)
        """
        if len(cmds) != 0:
                first = str.strip(cmds[0])
                if first[0] == 'w':
                        pass
                elif first[0] == 'r':
                        pass
                else:
                        parseExpr(first)
                parseSet(cmds[1:])

def parseExpr(cmds):
        """
        Parse expressions.
        <Term> {(+|-)<Term>}
        """
        print("Expr")
        if type(cmds) == str:
                delimit = "[+|-]+"
                terms = re.split(delimit, cmds)
        parseTerms(terms)
                
def parseTerms(cmds):
        """
        Parse terms. <Factor> {(*|/|%) <Factor>}.
        """
        if len(cmds) != 0:
                print("Term")
                delimit = "[*|/|%]+"
                factors = re.split(delimit, cmds[0])
                parseFactors(cmds[0])
                parseTerms(cmds[1:])

def parseFactors(cmds):
        """
        parseFactors assumes that D[_] and (_) can be expressions.
        This handles this case appropriately by parsing Expr.
        <Number> | D[<Expr>] | (<Expr>)
        """
        print("Factor")
        if cmds[0] == 'D':
                parseExpr(cmds[2:len(cmds)-1])
        elif cmds[0] == '(':
                parseExpr(cmds[1:len(cmds)-1])
        else:
                parseNumber(cmds)

def parseNumber(cmds):
        """
        Parse numbers.
        0|(1...9){0...9}
        """
        print("Number")
        
def parseJump(cmds):
        """
        Parse Jump command.
        jump <Expr>
        """
        if (len(cmds) != 0):
                parseExpr(cmds[0])
                parseJump(cmds[1:])
        
def parseJumpt(cmds):
        """
        Parse jumpt command.
        jumpt <Expr>, <Expr> (!= | == | > | < | >= | <=)<Expr>
        Code is duplicated in if-else checking.  Can refactor
        to a helper funciton that returns the correctly splitted array.
        """
        if (len(cmds) > 0):
                first = str.strip(cmds[0])
                if '==' in first:
                        cmds2 = re.split("[==|!=|>=|<=|>|<]+", first)
                        cmds[0] = cmds2[0]
                        cmds.append(str.strip(cmds2[1]))
                elif '!=' in first:
                        cmds2 = re.split("[==|!=|>=|<=|>|<]+", first)
                        cmds[0] = cmds2[0]
                        cmds.append(str.strip(cmds2[1]))
                elif '>=' in first:
                        cmds2 = re.split("[==|!=|>=|<=|>|<]+", first)
                        cmds[0] = cmds2[0]
                        cmds.append(str.strip(cmds2[1]))
                elif '<=' in first:
                        cmds2 = re.split("[==|!=|>=|<=|>|<]+", first)
                        cmds[0] = cmds2[0]
                        cmds.append(str.strip(cmds2[1]))
                elif '>'  in first:
                        cmds2 = re.split("[==|!=|>=|<=|>|<]+", first)
                        cmds[0] = cmds2[0]
                        cmds.append(str.strip(cmds2[1]))
                elif '<' in first:
                        cmds2 = re.split("[==|!=|>=|<=|>|<]+", first)
                        cmds[0] = cmds2[0]
                        cmds.append(str.strip(cmds2[1]))
                parseExpr(cmds[0])
                parseJumpt(cmds[1:])
	
if __name__ == '__main__':
        #Run the program.  argv[1] MUST be the input filepath.
	parseProgram(sys.argv[1])
