"use strict";

//Getting elements
const hourEl = document.querySelector(".hour");
const minuteEl = document.querySelector(".minute");
const displayEl = document.querySelector(".display");

const acEl = document.querySelector(".ac");
const pmEl = document.querySelector(".pm");
const percentageEl = document.querySelector(".percentage");

const divisionEl = document.querySelector(".division");
const multiplicationEl = document.querySelector(".multiplication");
const subtractionEl = document.querySelector(".subtraction");
const additionEl = document.querySelector(".addition");
const equalEl = document.querySelector(".equal");

const decimalEl = document.querySelector(".decimal");
const number0El = document.querySelector(".number-0");
const number1El = document.querySelector(".number-1");
const number2El = document.querySelector(".number-2");
const number3El = document.querySelector(".number-3");
const number4El = document.querySelector(".number-4");
const number5El = document.querySelector(".number-5");
const number6El = document.querySelector(".number-6");
const number7El = document.querySelector(".number-7");
const number8El = document.querySelector(".number-8");
const number9El = document.querySelector(".number-9");
const numberElArray = [
  number0El,
  number1El,
  number2El,
  number3El,
  number4El,
  number5El,
  number6El,
  number7El,
  number8El,
  number9El,
];

//Variables
let valueStrInMemory = null;
let lastClickedValue = null;
let operatorInMemory = null;

//Functions
const getDisplayValueAsString = () => {
  const currentDisplayValue = displayEl.textContent;
  //Split value to comma and merge
  return currentDisplayValue.split(",").join("");
};

const getDisplayValueAsNumber = () => {
  return parseFloat(getDisplayValueAsString());
};

const setDisplayStringAsValue = (valueStr) => {
  //If the last string is dot
  if (valueStr[valueStr.length - 1] === ".") {
    displayEl.textContent += ".";
    return;
  }
  //Splitting the float number to the whole and decimal part
  const [wholeNumStr, decimalStr] = valueStr.split(".");
  //If decimal part exists add it to the whole part
  if (decimalStr) {
    displayEl.textContent =
      parseFloat(wholeNumStr).toLocaleString("en-US") + "." + decimalStr;
  }
  //Otherwise display the whole part
  else {
    displayEl.textContent = parseFloat(wholeNumStr).toLocaleString("en-US");
  }
};

//Changes digits size back to normal size
const resetDigitSize = () => {
  document.getElementById("display").style.fontSize = "5.5rem";
};

//Changes digits size according to number of them
const changeDigitSize = () => {
  const currentDigitLength = getDisplayValueAsString().length;
  switch (currentDigitLength) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      document.getElementById("display").style.fontSize = "5.5rem";
      break;
    case 6:
      document.getElementById("display").style.fontSize = "4.4rem";
      break;
    case 7:
      document.getElementById("display").style.fontSize = "3.3rem";
      break;
    case 8:
      document.getElementById("display").style.fontSize = "2.8rem";
      break;
    case 9:
      document.getElementById("display").style.fontSize = "2.4rem";
      break;
    case 10:
      document.getElementById("display").style.fontSize = "2.4rem";
      break;
    default:
      document.getElementById("display").style.fontSize = "2.1rem";
      break;
  }
};

//Writes number with exponent
function toExponent(number, exp) {
  return Number.parseFloat(number).toExponential(exp);
}

const getPercentage = () => {
  setDisplayStringAsValue((getDisplayValueAsNumber() / 100).toString());
  const percentage = getDisplayValueAsString();
  lastClickedValue = percentage;
  valueStrInMemory = null;
  operatorInMemory = null;
};

const handleNumberClick = (numStr) => {
  const currentValueStr = getDisplayValueAsString();
  const currentValueNum = getDisplayValueAsNumber();
  lastClickedValue = getDisplayValueAsString();
  //If the first displayed number is 0, remove it when number is clicked
  if (currentValueStr === "0") {
    setDisplayStringAsValue(numStr);
  }
  //Otherwise add clicked number and limit number of digits to 9 digits

  //If number is positive integer and has length less than 9, add a digit
  else if (
    Number.isInteger(currentValueNum) &&
    getDisplayValueAsNumber() >= 0 &&
    currentValueStr.length < 9
  ) {
    setDisplayStringAsValue(currentValueStr + numStr);
    changeDigitSize();
  }
  //If number is negative integer and has length less than 10 (includes minus), add a digit
  else if (
    Number.isInteger(currentValueNum) &&
    getDisplayValueAsNumber() < 0 &&
    currentValueStr.length < 10
  ) {
    setDisplayStringAsValue(currentValueStr + numStr);
    changeDigitSize();
  }
  //If number is positive float and has length less than 10 (includes dot), add a digit
  else if (
    !Number.isInteger(currentValueNum) &&
    getDisplayValueAsNumber() > 0 &&
    currentValueStr.length < 10
  ) {
    setDisplayStringAsValue(currentValueStr + numStr);
    changeDigitSize();
  }
  //If number is negative integer and has length less than 11 (includes dot and minus), add a digit
  else if (
    !Number.isInteger(currentValueNum) &&
    getDisplayValueAsNumber() < 0 &&
    currentValueStr.length < 11
  ) {
    setDisplayStringAsValue(currentValueStr + numStr);
    changeDigitSize();
  }
};

const getResultOfOperationAsStr = () => {
  const currentValueNum = getDisplayValueAsNumber();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === "addition") {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === "subtraction") {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === "multiplication") {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === "division") {
    newValueNum = valueNumInMemory / currentValueNum;
  }

  return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
  const currentValueStr = getDisplayValueAsString();
  resetDigitSize();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setDisplayStringAsValue("0");
    return;
  }

  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setDisplayStringAsValue("0");
};

const handlePmButton = () => {
  const currentValueNum = getDisplayValueAsNumber();
  const currentValueStr = getDisplayValueAsString();
  //avoids adding minus to -0
  if (currentValueStr === "-0") {
    setDisplayStringAsValue("0");
    return;
  }
  //if positive, add minus as 0. character
  if (currentValueNum >= 0) {
    setDisplayStringAsValue("-" + currentValueStr);
  }
  //extract string from the 1. character to the end (exclude 0.)
  else {
    setDisplayStringAsValue(currentValueStr.substring(1));
  }
};

const equalCalculation = () => {
  if (getResultOfOperationAsStr() !== "NaN" && valueStrInMemory) {
    setDisplayStringAsValue(getResultOfOperationAsStr());
    valueStrInMemory = null;
    operatorInMemory = null;
  } else if (getResultOfOperationAsStr() === "NaN") {
    setDisplayStringAsValue(lastClickedValue);
    valueStrInMemory = null;
    operatorInMemory = null;
  }
  changeDigitSize();

  //If number length is greater than 11 write it with an exponent
  if (getDisplayValueAsString().length > 11) {
    displayEl.textContent = toExponent(getDisplayValueAsNumber(), 8);
  }
};

const handleDecimal = () => {
  const currentDisplayValueAsString = getDisplayValueAsString();
  //If display string has no dot, display it,otherwise do nothing
  if (!currentDisplayValueAsString.includes(".")) {
    setDisplayStringAsValue(currentDisplayValueAsString + ".");
  }
};

//addEventListener to functions
acEl.addEventListener("click", () => {
  setDisplayStringAsValue("0");
  valueStrInMemory = null;
  operatorInMemory = null;
  resetDigitSize();
});
pmEl.addEventListener("click", () => {
  handlePmButton();
});

percentageEl.addEventListener("click", () => {
  getPercentage();
});

//addEventListener to operators
divisionEl.addEventListener("click", () => {
  handleOperatorClick("division");
});
multiplicationEl.addEventListener("click", () => {
  handleOperatorClick("multiplication");
});
subtractionEl.addEventListener("click", () => {
  handleOperatorClick("subtraction");
});
additionEl.addEventListener("click", () => {
  handleOperatorClick("addition");
});
equalEl.addEventListener("click", () => {
  equalCalculation();
});

//addEventListener to numbers(0-9)
for (let i = 0; i < numberElArray.length; i++) {
  const numberEL = numberElArray[i];
  numberEL.addEventListener("click", () => {
    handleNumberClick(i.toString());
  });
}

//AddEventListener to decimal
decimalEl.addEventListener("click", () => {
  const currentDisplayValueAsString = getDisplayValueAsString();
  //If display string has no dot, display it,otherwise do nothing
  if (!currentDisplayValueAsString.includes(".")) {
    setDisplayStringAsValue(currentDisplayValueAsString + ".");
  }
});

//addEventListener to keyboard
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "0":
      handleNumberClick(e.key.toString());
      break;
    case "1":
      handleNumberClick(e.key.toString());
      break;
    case "2":
      handleNumberClick(e.key.toString());
      break;
    case "3":
      handleNumberClick(e.key.toString());
      break;
    case "4":
      handleNumberClick(e.key.toString());
      break;
    case "5":
      handleNumberClick(e.key.toString());
      break;
    case "6":
      handleNumberClick(e.key.toString());
      break;
    case "7":
      handleNumberClick(e.key.toString());
      break;
    case "8":
      handleNumberClick(e.key.toString());
      break;
    case "9":
      handleNumberClick(e.key.toString());
      break;
    case ".":
      handleDecimal();
      break;
    case "/":
      handleOperatorClick("division");
      break;
    case "*":
      handleOperatorClick("multiplication");
      break;
    case "-":
      handleOperatorClick("subtraction");
      break;
    case "+":
      handleOperatorClick("addition");
      break;
    case "%":
      getPercentage();
      break;
    case "=":
      equalCalculation();
      break;
    case "Enter":
      equalCalculation();
      break;
    case "Escape":
      setDisplayStringAsValue("0");
      valueStrInMemory = null;
      operatorInMemory = null;
      changeDigitSize();
      break;
    default:
      break;
  }
});

//Setting up the time
const initialTime = () => {
  const currentTime = new Date();

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  hourEl.textContent = currentHour.toString().padStart(2, "0");
  minuteEl.textContent = currentMinute.toString().padStart(2, "0");
};
setInterval(initialTime, 1000);
initialTime();
