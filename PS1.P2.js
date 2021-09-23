/* A function that takes input in the format '4+2' and returns a function
    to implement the input operator that returns the result

    Note: The function name and its code seem unmatched because I'm still bad at writing functions using "fat arrow =>"
* */

//Parsing two digits
let evaluate = str => {
    let expr_list = str.split("");
    const left = Number(expr_list[0]);
    const right = Number(expr_list[2]);
    return parse(left,right,str);
};
//Evaluating the expression using the operator that is incorporated in expression
let parse = (left, right, str) => {
    let expr_list = str.split("");
    let a = left ;
    let b = right
    let operator = str.split("")[1];
    if (operator == "+"){
        return  (left,right) => (a + b);
    }else if (operator == "-"){
        return (left,right) => a - b;
    }else if (operator == "*"){
        return (left,right)=> a * b;
    }else if (operator == "^"){
        return (left,right)=> a ** b;
    }else if (operator == "%"){
        return (left,right)=> a % b;
    }else if (operator == "/"){
        return (left,right)=> a / b;
    }
};

const expression = "8%3";
let operator = evaluate(expression);
console.log(`${expression} = ${operator(expression)}`);