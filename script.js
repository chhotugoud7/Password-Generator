// const inputSlider = document.querySelector("[data-lengthSlider]"); 
// const lengthDisplay = document.querySelector("[data-lengthNumber]"); 

// const passwordDisplay = document.querySelector("[data-passwordDisplay]");
// const copybtn = document.querySelector("[data-copy]");
// const copyMsg = document.querySelector("[data-copyMsg]");
// const uppercaseCheck = document.querySelector("#uppercase");
// const lowercaseCheck = document.querySelector("#lowercase");
// const numbersCheck = document.querySelector("#numbers");
// const symbolsCheck = document.querySelector("#symbols");
// const indicator = document.querySelector("[data-indicator]");
// const generateBtn = document.querySelector(".generateButton");
// const allCheckBox = document.querySelectorAll("input[type=checkbox]");
// const symbols = '~`!@#$%^&*()_+{}|:"<>?/.,][=-/?';


// // initially
// let password = "";
// let passwordLength = 10;
// let checkCount = 0;
// handleSlider();
// // ste strength circle colar to grey


// // set passwordLength
// function handleSlider() {
//     inputSlider.value = passwordLength;
//     lengthDisplay.innerText = passwordLength;
//     // or kuch bhi karna chahiye ? - HW
// }

// function setIndicator(color) {
//     indicator.computedStyleMap.backgroundcolor = color;

// }

// function getRndInteger(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }

// function generateRandomNumber() {
//     return getRndInteger(0,9);
// }

// function generateLowerCase(){
//     return String.fromCharCode(getRndInteger(97,123));
// }

// function generateUpperCase(){
//     return String.fromCharCode(getRndInteger(65,91));
// }

// function generateSymbol(){
//     const randNum = getRndInteger(0, symbols.length);
//     return symbols.charAt(randNum);
// }

// function calcStrength() {
//     let hasUpper = false;
//     let hasLower = false;
//     let hasNum = false;
//     let hasSym = false;
//     if (uppercaseCheck.checked) hasUpper = true;
//     if (lowercaseCheck.checked ) hasLower = true;
//     if (numbersCheck.checked ) hasNum = true;
//     if (symbolsCheck.checked ) hasSym = true;

//     if ( hasUpper && hasLower && (hasNum || hasSym ) && passwordLength >= 8) {
//         setIndicator("#0f0");
//     } else if (
//         (hasLower || HasUpper) &&
//         (hasNum || hasSym) &&
//         passwordLength >= 6
//     ) {
//         setIndicator("#ff0");
//     } else {
//         setIndicator("#f00");
//     }
// }

// async function copyContent(){
//     try{
//         await navigator.clipboard.writeText(passwordDisplay.value);
//         copyMsg.innerText = "copied";
//     }
//     catch(e) {
//         copyMsg.innerText = "Failed";
//     }
//     // mising line 
//     setTimer( () => {
//         copyMsg.classList.remove("active");
//     },2000);
// }





// DOM Elements
const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const copyBtn = document.querySelector('[data-copy]');
const copyMsg = document.querySelector('[data-copyMsg]');
const lengthSlider = document.querySelector('[data-lengthSlider]');
const lengthNumber = document.querySelector('[data-lengthNumber]');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const strengthIndicator = document.querySelector('[data-indicator]');
const generateBtn = document.querySelector('.generateButton');

// Character sets
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

// initail styling for the slider background color fill
lengthSlider.style.backgroundSize = `50% 100%`
// Update length number when slider changes
lengthSlider.addEventListener('input', (e) => {
    let value = e.target.value;
    
    let min = e.target.min;
    let max = e.target.max;
    // Update the number display
    lengthNumber.innerText = value;
    // Calculate percentage for track fill
    let percentage = ((value - min) / (max - min)) * 100;
    // Update the slider background size
    lengthSlider.style.backgroundSize = `${percentage}% 100%`;
});

// Generate password
generateBtn.addEventListener('click', () => {
    const length = lengthSlider.value;
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    passwordDisplay.value = password;
    updateStrengthIndicator(password);
});

// Copy password to clipboard
copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        navigator.clipboard.writeText(passwordDisplay.value).then(() => {
            copyMsg.innerText = 'Copied!';
            setTimeout(() => {
                copyMsg.innerText = '';
            }, 2000);
        });
    }
});

// Function to generate password
function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    let characters = '';
    if (includeUppercase) characters += uppercaseLetters;
    if (includeLowercase) characters += lowercaseLetters;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (!characters) {
        alert('Please select at least one character type!');
        return '';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}

// Function to update strength indicator
function updateStrengthIndicator(password) {
    const strength = calculatePasswordStrength(password);
    strengthIndicator.style.backgroundColor = getStrengthColor(strength);
    strengthIndicator.style.boxShadow = `0px 0px 12px 1px ${getStrengthColor(strength)}`;
}

// Function to calculate password strength
function calculatePasswordStrength(password) {
    let strength = 0;

    // Length check
    if (password.length >= 12) strength += 2;
    else if (password.length >= 8) strength += 1;

    // Character type checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
}

// Function to get strength color
function getStrengthColor(strength) {
    if (strength >= 6) return 'green'; // Strong
    if (strength >= 4) return 'orange'; // Medium
    return 'red'; // Weak
}