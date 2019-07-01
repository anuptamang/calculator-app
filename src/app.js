const inputInfo = document.querySelector('[data-input-info]');
const formControl = document.querySelector('[data-form-control]');
const inputValueBtn = document.querySelectorAll('[data-input]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const clearBtn = document.querySelector('[data-clear]');
const clearAllBtn = document.querySelector('[data-clear-all]');
const btnSubmit = document.querySelector('[data-submit]');
let inputDataValuesLeft = [];
let inputDataValuesRight = [];
let formValueArray = [];
let formValue = '';
let valueLeft = '';
let valueRight = '';
let operator = '';
let operatorType = '';
let output = '';
let inputLeft = true;
let inputRight = false;
let operatorActive = true;

formControl.addEventListener('keyup', validateInput);

inputValueBtn.forEach(btn => {
    btn.addEventListener('click', getData);
});

operatorBtn.forEach(btn => {
    btn.addEventListener('click', getOperator);
});

clearBtn.addEventListener('click', clearData);
clearAllBtn.addEventListener('click', clearDataAll);
btnSubmit.addEventListener('click', calculateAll);

console.log(inputLeft)

function getOperator(e) {
    e.preventDefault();

    operatorType = e.target.innerText;

    operator = operatorType;

    formValue = valueLeft + operator;
    formControl.value = formValue;
    console.log(valueLeft)

    console.log(operator)
    console.log(operatorActive)

    return inputLeft = false, operatorActive = false;

}

function getData(e) {
    e.preventDefault();

    if (inputLeft) {
        inputDataValuesLeft.push(e.target.innerText);

        // return inputLeft = false;
        valueLeft = inputDataValuesLeft.join('');

        console.log(valueLeft);
        console.log(inputDataValuesLeft);
    }

    if (!operatorActive) {
        console.log('enter right values')

        inputDataValuesRight.push(e.target.innerText);

        valueRight = inputDataValuesRight.join('');

        console.log(inputDataValuesRight)

        console.log(valueRight)
    }

    formValue = valueLeft + operator + valueRight;
    formControl.value = formValue;
}

function clearData(e) {
    e.preventDefault();

    if (inputLeft && inputDataValuesLeft.length > 0) {
        inputDataValuesLeft.pop();

        valueLeft = inputDataValuesLeft.join('');

        console.log(inputDataValuesLeft);
        console.log(formValue)
        console.log(operatorActive)

        formControl.value = valueLeft;

        return inputLeft;

    }

    if (!operatorActive && inputLeft) {
        inputDataValuesLeft.pop();

        valueLeft = inputDataValuesLeft.join('');

        console.log(valueLeft)
        console.log(inputDataValuesLeft)

    }

    if (!operatorActive && !inputLeft) {
        inputDataValuesRight.pop();

        valueRight = valueLeft + inputDataValuesRight.join('');

        formControl.value = valueRight;


        console.log(valueRight + ' from rightPOP')

        console.log(inputDataValuesRight)
        console.log(valueRight)
        console.log(operatorActive)

        return operatorActive = false, inputLeft;
    }

}

function clearDataAll(e) {
    e.preventDefault();
    reset();
    formControl.value = '';

}

function calculateAll(e) {
    e.preventDefault();

    let param1 = Number(valueLeft);
    let param2 = Number(valueRight);
    let computingOperator = operator;

    if (computingOperator === '+') {
        output = param1 + param2;
        formControl.value = formValue + '=' + output;
        reset();

    } else if (computingOperator === '-') {
        output = param1 - param2;
        formControl.value = formValue + '=' + output;
        reset();

    } else if (computingOperator === '*') {
        output = param1 * param2;
        formControl.value = formValue + '=' + output;
        reset();

    } else if (computingOperator === '/') {
        output = param1 / param2;
        formControl.value = formValue + '=' + output;
        reset();
    } else {
        formControl.value = '';
    }

}

function reset() {
    valueLeft = '';
    valueRight = '';
    formValue = '';
    operator = '';
    operatorType = '';
    inputDataValuesLeft = [];
    inputDataValuesRight = [];
    inputLeft = true;
    inputRight = false;
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

function checkOperatorType(type) {
    if (type === '+' && type === '-' && type === '*' && type === '/') {
        return false;
    }
}