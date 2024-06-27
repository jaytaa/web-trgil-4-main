// Select the main header of the page
const header = document.querySelector('h1');

// Select the element where the app will be rendered
const app = document.getElementById('app');
const resultDiv = document.getElementById('result');
const calcForm = document.getElementById('calcForm');

// Select the whole HTML element to toggle dark/light mode
const html = document.documentElement;

// Function to toggle dark/light mode
const toggle = () => {
    html.classList.toggle('dark');
    renderThemeToggle();
};

// Sets the view and render corresponding content
const setView = (v) => {
    header.innerText = v;
    toggleMenu(true);

    if (v === 'Calculator') {
        renderCalculator();
    } else if (v === 'About') {
        renderAbout();
    } else if (v === 'Contact') {
        renderContact();
    }
};

// Toggles the mobile menu
const toggleMenu = (hide) => {
    const ddMenu = document.getElementById('ddMenu');
    const svgIcons = document.querySelectorAll('svg');

    if (!ddMenu) {
        console.warn('Element with id "ddMenu" not found.');
        return;
    }

    if (svgIcons.length < 2) {
        console.warn('Not enough SVG icons found.');
        return;
    }

    if (!hide) {
        ddMenu.classList.toggle('hidden');
        svgIcons.forEach((el) => {
            el.classList.toggle('hidden');
        });
    } else {
        ddMenu.classList.add('hidden');
        svgIcons[0].classList.remove('hidden');
        svgIcons[1].classList.add('hidden');
    }
};

// Adds a row to the calculator
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`;
    container.insertAdjacentHTML('beforeend', row);
};

// Adds the monitor display to the calculator
const addMonitor = (container, text) => {
    const t = text ?? '';
    const monitor = `<div id='monitor' class="bg-white dark:bg-gray-700 border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 dark:text-white p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`;
    container.insertAdjacentHTML('beforeend', monitor);
};

// Creates a calculator button
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : '';
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`;
};

// Adds buttons to the calculator
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('');
    addRow(container, btnHTML);
};

// Handles button clicks on the calculator
const click = (event) => {
    const monitor = document.getElementById('monitor');
    const bac = monitor.innerText.trim();
    const a = event.target.innerText;
    console.log(a);
    if (a === 'clear') {
        monitor.innerText = '';
    } else if (a === 'calculate') {
        try {
            monitor.innerText = bac + '=' + eval(bac);
        } catch (e) {
            monitor.innerText = 'Error';
        }
    } else {
        monitor.innerText += a;
    }
};

// Renders the calculator
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear'];
    app.innerHTML = '';
    addMonitor(app);
    addButtons(app, labels);
    const buttons = document.querySelectorAll('.d-btn');
    buttons.forEach((el) => el.addEventListener('click', click));
};

// Renders the About section
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>';
};

// Renders the Contact section
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>';
};

// Renders the top menu dynamically
const renderMenu = () => {
    const menu = document.getElementById('dynamicMenu');
    menu.innerHTML = `
        <button class="block sm:hidden" onclick="toggleMenu()">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512">
                <path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
            </svg>
            <svg class="hidden" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512">
                <path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
        </button>
        <div id="ddMenu" class="absolute top-[56px] left-0 bg-blue-300 p-3 hidden w-full">
            <button class="block py-1 px-2" onclick="setView('Calculator')">Calculator</button>
            <button class="block py-1 px-2" onclick="setView('About')">About</button>
            <button class="block py-1 px-2" onclick="setView('Contact')">Contact</button>
        </div>
        <div class="justify-start gap-4 hidden sm:flex">
            <button onclick="setView('Calculator')">Calculator</button>
            <button onclick="setView('About')">About</button>
            <button onclick="setView('Contact')">Contact</button>
        </div>
        <button class="dark:hidden block toggle-theme" onclick="toggle()">Dark</button>
        <button class="hidden dark:block toggle-theme" onclick="toggle()">Light</button>
    `;
};

// Renders the theme toggle buttons dynamically
const renderThemeToggle = () => {
    const themeToggleButtons = document.querySelectorAll('.toggle-theme');
    themeToggleButtons.forEach(button => {
        button.textContent = html.classList.contains('dark') ? 'Light' : 'Dark';
    });
};

// Handle form submission
calcForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const expression = document.getElementById('expression').value;
    calculateAndDisplay(expression);
});

// Calculate and display the result
const calculateAndDisplay = (expression) => {
    const calculator = new Calculator(expression);
    const result = calculator.evaluate();
    displayResult(result);
};

// Display the result
const displayResult = (result) => {
    resultDiv.innerHTML = `<div class="bg-white dark:bg-gray-700 border-4 border-blue-400 p-4 rounded-lg font-bold text-2xl text-black dark:text-white">${result}</div>`;
};

// Calculator object to store and evaluate the expression
class Calculator {
    constructor(expression) {
        this.expression = expression;
    }

    evaluate() {
        try {
            return eval(this.expression);
        } catch (e) {
            return 'Error';
        }
    }
}

// Initial rendering of the menu, theme toggle buttons, and calculator
renderMenu();
renderThemeToggle();
renderCalculator();
