function add (a, b){
    return a + b;
};
function subtract (a, b){
    return a - b;
};
function multiply (a, b){
    return a * b;
};
function divide (a, b){
    if (b === 0) return 'Snarky ErRoR';
    else return a / b;
};
function operate (a, op, b){
    if (op === '+') {
        return add (a, b);
    }
    else if (op === '-') {
        return subtract (a, b)
    }
    else if (op === 'x') {
        return multiply (a, b)
    }
    else if (op === '÷') {
        return divide (a, b);
    }
}
let operatorsArray = [];
let numbersArray = [];
let lastdigitNum = 0;
let lastdigitOp = 0;
let totaldigits = 0;
function display (variable){
    const screen = document.querySelector("#display");
    if(screen.textContent === 'ERROR' || totaldigits > 10 ) return (screen.textContent = 'ERROR');
    if (Number(variable) === variable){
        if(lastdigitNum === 1){
            let con = numbersArray[(numbersArray.length-1)].toString();
            numbersArray[(numbersArray.length-1)] = Number(con + variable);
        }else{
        numbersArray.push(variable);
        }
        lastdigitNum = 1;
        lastdigitOp = 0;
        totaldigits += 1;
    }else {
        if(lastdigitOp === 1) return (screen.textContent = 'ERROR');
        operatorsArray.push(variable);
        lastdigitNum = 0;
        lastdigitOp = 1;
        totaldigits += 1;
    }  
    screen.textContent += variable;
}
const nums = document.querySelectorAll ('.number');
for (const num of nums){
    num.addEventListener('click', () => display(Number(num.textContent)));
}
const opes = document.querySelectorAll ('.operator');
for (const ope of opes){
    ope.addEventListener('click', () => display(ope.textContent));
}
const eraseButton = document.querySelector('#AC');
eraseButton.addEventListener('click', ()=> {
    const screen = document.querySelector("#display");
    screen.textContent = '';
    totaldigits = 0;
    operatorsArray = [];
    numbersArray = [];
    lastdigitNum = 0;
    lastdigitOp = 0;
});

const equals = document.querySelector('#equals');
equals.addEventListener('click', () => {
    const screen = document.querySelector("#display");
    if(screen.textContent === 'ERROR') return (screen.textContent = 'ERROR');
    if (screen.textContent === '') return (screen.textContent = 'nothing here :/');
    while (numbersArray.length > 1){
        let store = operate(numbersArray[0],operatorsArray[0],numbersArray[1]);
        console.log(store);
        numbersArray.shift();
        numbersArray.shift();
        numbersArray.unshift(store);
        operatorsArray = operatorsArray.slice(1);
    };
    if (numbersArray[0] === 'Snarky ErRoR' || screen.textContent === 'nothing here :/') screen.textContent = 'try again lol';
    else {
        screen.textContent = +numbersArray[0].toFixed(5) + operatorsArray;
        if (numbersArray[0].toFixed(5).toString().length > numbersArray[0].toString().length){
            totaldigits = numbersArray[0].toString().length;
        }
        else{
            totaldigits = numbersArray[0].toFixed(5).toString().length;
        }
    }

});