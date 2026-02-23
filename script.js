document.addEventListener('DOMContentLoaded', () => {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calcBtn = document.getElementById('calc-btn');
    const resultsContainer = document.getElementById('results');

    const wrapper1 = document.getElementById('wrapper1');
    const wrapper2 = document.getElementById('wrapper2');
    const error1 = document.getElementById('error1');
    const error2 = document.getElementById('error2');

    const validateInput = (input, wrapper, errorTextElement) => {
        const value = input.value.trim();

        if (value === '') {
            errorTextElement.textContent = 'Поле пустое';
            wrapper.classList.add('error');
            return false;
        }

        if (isNaN(Number(value))) {
            errorTextElement.textContent = 'Должно быть числом';
            wrapper.classList.add('error');
            return false;
        }

        wrapper.classList.remove('error');
        return true;
    };

    calcBtn.addEventListener('click', () => {
        wrapper1.classList.remove('error');
        wrapper2.classList.remove('error');

        const isNum1Valid = validateInput(num1Input, wrapper1, error1);
        const isNum2Valid = validateInput(num2Input, wrapper2, error2);

        if (!isNum1Valid || !isNum2Valid) {
            return;
        }

        const n1 = Number(num1Input.value.trim());
        const n2 = Number(num2Input.value.trim());
        const op = operationSelect.value;
        let result = 0;

        switch (op) {
            case '+': result = n1 + n2; break;
            case '-': result = n1 - n2; break;
            case '*': result = n1 * n2; break;
            case '/':
                if (n2 === 0) {
                    error2.textContent = 'Деление на ноль!';
                    wrapper2.classList.add('error');
                    return;
                }
                result = n1 / n2;
                result = Math.round(result * 1000000) / 1000000;
                break;
        }

        const existingResults = resultsContainer.querySelectorAll('.result-item');
        existingResults.forEach(item => {
            item.classList.add('faded');
        });

        const resultText = `${n1} ${op} ${n2} = ${result}`;
        const newResultDiv = document.createElement('div');
        newResultDiv.className = 'result-item';
        newResultDiv.textContent = resultText;

        resultsContainer.appendChild(newResultDiv);
    });

    num1Input.addEventListener('input', () => wrapper1.classList.remove('error'));
    num2Input.addEventListener('input', () => wrapper2.classList.remove('error'));
});