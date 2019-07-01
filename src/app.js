const inputInfo = document.querySelector('#input-info');
const formControl = document.querySelector('#form-input');
const inputValueBtn = document.querySelectorAll('.data-input-btn');
const operatorBtn = document.querySelectorAll('.data-input-operator');
const clearBtn = document.querySelector('#input-clear');
const clearAllBtn = document.querySelector('#input-clear-all');
const btnSubmit = document.querySelector('#btn-submit');
let inputDataValuesLeft = [];
let inputDataValuesRight = [];
let operator = '';
let valueLeft = '';
let valueRight = '';
let output;
let inputLeft = true;
let inputRight = false;
let operatorActive = true;

formControl.addEventListener('keyup', validateInput);

for (let btn of inputValueBtn) {
    btn.addEventListener('click', getData);
}

for (let btn of operatorBtn) {
    btn.addEventListener('click', getOperator);
}

clearBtn.addEventListener('click', clearData);
clearAllBtn.addEventListener('click', clearDataAll);
btnSubmit.addEventListener('click', calculateAll);

function getOperator(e) {
    e.preventDefault();
    operator = e.target.innerText;
    formControl.value = valueLeft + operator;
    return inputLeft = false, operatorActive = false;
}

function getData(e) {
    e.preventDefault();

    if (inputLeft) {
        inputDataValuesLeft.push(e.target.innerText);
        valueLeft = inputDataValuesLeft.join('');
        formControl.value = valueLeft;
    }

    if (!operatorActive) {
        inputDataValuesRight.push(e.target.innerText);
        valueRight = inputDataValuesRight.join('');
        formControl.value = valueLeft + operator + valueRight;
    }

}

function clearData(e) {
    e.preventDefault();

    if (inputLeft) {
        inputDataValuesLeft.pop();
        valueLeft = inputDataValuesLeft.join('');
        formControl.value = valueLeft;

        if (!operatorActive && !inputLeft) {
            valueLeft = inputDataValuesLeft.join('');
            formControl.value = valueLeft;

            operatorActive = true;
            inputLeft = true;
            inputRight = true;
        }

    }


    if (!operatorActive && !inputLeft) {
        inputDataValuesRight.pop();
        valueRight = inputDataValuesRight.join('');
        formControl.value = valueLeft + operator + valueRight;
        inputRight = true;
    }
}

function clearDataAll(e) {
    e.preventDefault();
    reset();
    formControl.value = 0;
    inputInfo.innerHTML = '&nbsp;';
}

function calculateAll(e) {
    e.preventDefault();

    let param1 = Number(valueLeft);
    let param2 = Number(valueRight);
    let computingOperator = operator;

    if (computingOperator === '+') {
        output = param1 + param2;
        formControl.value = '=' + output;
        inputInfo.innerHTML = param1 + '+' + param2;
        reset();

    } else if (computingOperator === '-') {
        output = param1 - param2;
        inputInfo.innerHTML = param1 + '-' + param2;
        formControl.value = '=' + output;
        reset();

    } else if (computingOperator === '*') {
        output = param1 * param2;
        inputInfo.innerHTML = param1 + '*' + param2;
        formControl.value = '=' + output;
        reset();

    } else if (computingOperator === '/') {
        output = param1 / param2;
        inputInfo.innerHTML = param1 + '/' + param2;
        formControl.value = '=' + output;
        reset();
    } else {
        formControl.value = '';
    }

}

function reset() {
    valueLeft = '';
    valueRight = '';
    operator = '';
    inputDataValuesLeft = [];
    inputDataValuesRight = [];
    inputLeft = true;
    operatorActive = true;
}

function validateInput() {
    let input = formControl.value;
    let regexAlphabet = input.search(/[a-zA-Z]+/g);

    if (!regexAlphabet) {
        reset();
        formControl.value = '';
    }
}