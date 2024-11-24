let display = document.getElementById('result');
let history = document.getElementById('history');

function addToDisplay(value) {
    if (display.value === 'Error') {
        display.value = '';
    }
    display.value += value;
    animateButton(event.target);
}

function clearDisplay() {
    display.value = '';
    history.textContent = '';
    animateButton(event.target);
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    animateButton(event.target);
}

function calculate() {
    try {
        let expression = display.value;
        
        // Store the expression in history
        history.textContent = expression;
        
        // Replace mathematical symbols and functions
        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');
        expression = expression.replace(/tan\(/g, 'Math.tan(');
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/ln\(/g, 'Math.log(');
        expression = expression.replace(/√\(/g, 'Math.sqrt(');
        expression = expression.replace(/\^2/g, '**2');
        
        let result = eval(expression);
        
        // Format the result
        if (Number.isInteger(result)) {
            display.value = result;
        } else {
            display.value = parseFloat(result.toFixed(8));
        }
        
        // Add animation
        display.classList.add('result-fade');
        setTimeout(() => {
            display.classList.remove('result-fade');
        }, 300);
        
    } catch (error) {
        display.value = 'Error';
    }
    animateButton(event.target);
}

function animateButton(button) {
    button.classList.add('button-press');
    setTimeout(() => {
        button.classList.remove('button-press');
    }, 200);
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.' || key === '+' || 
        key === '-' || key === '*' || key === '/' || key === '(' || key === ')') {
        addToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}); 