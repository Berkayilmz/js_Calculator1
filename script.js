const display = document.querySelector('.calculator-input');
const key = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

function inputNumber(num) {
    if (waitingForSecondValue === true) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' && waitingForSecondValue === false ? num : displayValue + num;
    }
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function clear() {
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(14))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator) {
    switch (operator) {
        case '+': return first + second; break;
        case '-': return first - second; break;
        case '*': return first * second; break;
        case '/': return first / second; break;
        default: return second;
    }
}

key.addEventListener('click', function (e) {
    const element = e.target;
    const value = element.value;

    if (!element.matches('button')) return; // matches metodu ile eşleşme kontrolü yapılır. Burada ise elementin buton olup olmadığı sorgulanmıştır.

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value); break;
        case '.':
            inputDecimal(); break;
        case 'clear':
            clear(); break;
        case '=':
            handleOperator(value); break
        default: inputNumber(value);
    }



    updateDisplay();
});