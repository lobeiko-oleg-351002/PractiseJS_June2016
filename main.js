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


function isOperator(char)
{
    var operators = "()/*+-"
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

function toRPN(str)
{
    var rpn = [];
    var stack = [];
    stack.push("terminal");
    for (i = 0; i < str.length; i++)
    {
        if (!isNaN(str[i])) {
            var number = "";
            while (!isNaN(str[i])) {
                number += str[i];
                i++;
            }    
            rpn.push(number);
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
        
       // console.log(stack)
    }
    while (stack.length > 1) {
        rpn.push(stack.pop());
    }
    return rpn;
}

function evaluate(str)
{
    var rpn = toRPN(str);
    var stack = [];
    for (i = 0; i < rpn.length; i++) {
        if (!isNaN(rpn[i])) {
            stack.push(rpn[i]);
        }    
        else if ((rpn[i] != "(") && (rpn[i] != ")")){
            var op2 = stack.pop();
            var op1 = stack.pop();
            switch(rpn[i])
            {
                case "+": 
                    op1 = Number(op1) + Number(op2);                  
                    break;
                case "-": 
                    op1 = Number(op1) - Number(op2);
                    break;
                case "*": 
                    op1 = Number(op1) * Number(op2);
                    break;
                case "/": 
                    op1 = Number(op1) / Number(op2);
                    break;
            }
            stack.push(op1);                      
        }      
    }
    return stack.pop();
}