"use strict";
console.log(evaluate("2+2")) //22+
console.log(evaluate("2+2-4")) //22+4-
console.log(evaluate("2+2*3"))  //223*+ 
console.log(evaluate("2+4/2"))  //242/+
console.log(evaluate("2*2*2"))  //222**
console.log(evaluate("5+5+5-10"))   //55+5+10-  
console.log(evaluate("2+2+(1+2)"))  //2 2 + 1 2 + -
console.log(evaluate("2+2*9/3"))    //2 2 9 * 3 / +
console.log(evaluate("(3*5)-4/4"))  //3 5 * 4 4 / -
console.log(evaluate("2+2+(2-1)*(5-3)"))    //2 2 + 2 1 - 5 3 - * +
console.log(evaluate("(5+5+5)/3/(4+1)"))    //5 5 + 5 + 3 / 4 1 + /
console.log(evaluate("(3-42)/4+28*2")) 
console.log(evaluate("(3-4.2)/4+28*2.76"));
console.log(evaluate("(-3-42)/4+28*2"));
console.log(evaluate("(3+97)^2"));
console.log(evaluate("-2.33"));
console.log(evaluate("-2+1"));
console.log(evaluate("2+4-2*4/8"));

const regExp = /^([-+]?)(?![-^+*\/])(\(*)(\d*(\.(?![-^+*\/\)])\d*)?)(?:([-^+*\/](?![-.^+*\/\)]))(\(*)(\d*?(\.(?![-^+*\/\)])\d*)?\)*))*$/;
var expression = "";
var openedBrackets = 0;

function putBracket()
{
    var lastChar;
    if (expression.length === 0) {
        lastChar = "";
    }
    else {
        lastChar = expression[expression.length-1];
    }
    var bracket = "";
    
    if (((!isNaN(lastChar)) || (lastChar == ")")) && (openedBrackets > 0)) {
        bracket = ")";
        openedBrackets--;       
    }
    else {
        if ((lastChar == "") || ("/*+-^".indexOf(lastChar) != -1)) {
            bracket = "(";
            openedBrackets++;
        }
    }
    addCharToExpression(bracket);
}

function validate(newExpression)
{    
    if (newExpression.match(regExp)) {
        return true;
    }
    return false;
}
function processingExpression()
{
    document.getElementById("result").textContent = evaluate(expression);
    expression = "";
}

function addCharToExpression(char)
{
    setExpression(expression + char);
}

function deleteCharFromExpression()
{
    expression = expression.slice(0,expression.length - 1);
    document.getElementById("result").textContent = expression;
}

function setExpression(newExpression)
{
    if (validate(newExpression)) {
        document.getElementById("result").textContent = newExpression;
        expression = newExpression;
    }    
}

function clearExpression()
{
    document.getElementById("result").textContent = "";
    expression = "";
}

function isOperator(char)
{
    var operators = "()/*+-^"
    if (operators.indexOf(char) != -1) {
        return true;
    }
    return false;
}

function getPriority(operator)
{
    var priority = -1;
    switch(operator) {       
        case "(":
            priority = 5;
            break;
        case ")":
            priority = 1;
            break;
        case "+":
            priority = 2;
            break;
        case "-":
            priority = 2;
            break;
        case "*":
            priority = 3;
            break;
        case "/":
            priority = 3;
            break;
        case "^":
            priority = 4;
            break;
    }
    return priority;
}

function comparePriorities(op1, op2)
{
    if (getPriority(op1) > getPriority(op2)) {
        return true;
    }
    return false;
}

function readNumber(str,i)
{
    var number = "";
    while (!isNaN(str[i])) {
        number += str[i];
        i++;
        if (i < str.length) {
            if (str[i] == ".") {
                number += str[i];
                i++;
            }
        }
    }    
    return number;
}

function isUnaryOperator(char, i) {
    if (((char == "-") || (char == "+")) && ((i == 0) || (isOperator(char)) && (char != ")"))) {
        return true;
    }
    return false;
}
function toRPN(str)
{
    var rpn = [];
    var stack = [];
    stack.push("terminal");
    for (var i = 0; i < str.length; i++)
    {
        var number;
        if (!isNaN(str[i])) {
            number = readNumber(str,i); 
            i += number.length;
            rpn.push(number);
        }
        else {
            if (isUnaryOperator(str[i], i)) {
                number = str[i] + readNumber(str,i+1); 
                i += number.length;
                rpn.push(Number(number));
            }
        }
        if (isOperator(str[i])) {
            if (comparePriorities(str[i],stack[stack.length-1])) {
                stack.push(str[i]);
            }
            else {
                rpn.push(stack.pop());
                stack.push(str[i]);
            }
        }
        //console.log("rpn: " + rpn)
        //console.log("stack: " + stack+'\n')
    }
    while (stack.length > 1) {
        rpn.push(stack.pop());
    }
    return rpn;
}

function calculate(operator, op1, op2)
{
    switch(operator)
    {
        case "+": 
            op1 = op1 + op2;                  
            break;
        case "-": 
            op1 = op1 - op2;
            break;
        case "*": 
            op1 = op1 * op2;
            break;
        case "/": 
            op1 = op1 / op2;
            break;
        case "^":
            op1 = Math.pow(op1,op2);
            break;
    }
    return op1;
}

function evaluate(str)
{
    var rpn = toRPN(str);
    var stack = [];
    for (var i = 0; i < rpn.length; i++) {
        if (!isNaN(rpn[i])) {
            stack.push(rpn[i]);
        }    
        else {
            if ((rpn[i] != "(") && (rpn[i] != ")")) {
                var op2 = Number(stack.pop());
                var op1 = Number(stack.pop());
                stack.push(calculate(rpn[i],op1,op2));   
            }
        }      
    }
    return stack.pop();
}