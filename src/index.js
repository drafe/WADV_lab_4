import {Expression} from "./expression";

document.addEventListener('DOMContentLoaded',setup);

function setup(){
    const button = document.getElementById('ExprButton');
    button.onclick = addExpression;
}
function addExpression(){
    const expression = document.getElementById('Expr').value;
    console.log(expression);
    const diff_expr = new Expression(expression);
    const variable = document.getElementById('Var').value;
    console.log(variable);
    const container = document.getElementById('mathContainer');
    const expressionElement = document.createElement('div');
    expressionElement.innerHTML =  "(" + expression + ")'<sub>"+variable+"</sub> = " + diff_expr.diff(variable).toString();
    container.appendChild(expressionElement);
}
