//  get all key button
const allKeys = document.querySelectorAll("#key");


let firstOperand = null
let operator = null
let SecondOperand = null


// all operation store as a object
const operations = {
    "+": function(number, number2) {
        return parseFloat(number) + parseFloat(number2)
    },
    "-": function(number, number2) {
        return parseFloat(number) - parseFloat(number2)
    },
    "*": function(number, number2) {
        return parseFloat(number) * parseFloat(number2)
    },
    "/": function(number, number2) {
        return parseFloat(number) / parseFloat(number2)
    }
}

// reset calculator
function resetCalculator() {
    firstOperand = null
    operator = null
    SecondOperand = null
    setResult("")

}

// get display innerText
function getDisplayValue() {
    const display = document.getElementById("display")
    return display.innerText
}


// set result in display
function setResult(result) {
    const display = document.getElementById("display")
    display.innerText = result;
}


// set all operand and operator in display
function setDisplayValue(firstOperand, operator, SecondOperand) {
    const display = document.getElementById("display")

    let outString = ''
    if (firstOperand !== null) {
        outString = firstOperand
    }
    if (operator !== null) {
        outString += operator
    }
    if (SecondOperand !== null) {
        outString += SecondOperand
    }
    display.innerText = outString

}

// check if key is number or not
function isNumber(key) {
    return !isNaN(Number(key))
}


//  set event on all keys
allKeys.forEach(btn => {
    btn.addEventListener("click", function(evt) {
        let key = evt.target.dataset.key

        // if press clear button. then clear all state
        if (key === "c") {
            resetCalculator()
            return;
        }

        if ((operator === null)) {
            if (isNumber(key)) {
                if (firstOperand) {
                    firstOperand += key
                } else {
                    firstOperand = key
                }
                operator = null;

            } else {

                if (firstOperand === null) {
                    alert("please put number as  a firstOperand")
                    return
                }

                if (key !== "=") {
                    operator = key
                }

            }
        } else {
            if (key === "=") {
                if (SecondOperand) {
                    let calc = operations[operator];
                    let result = calc(firstOperand, SecondOperand)
                    setResult(result)
                    firstOperand = result === Infinity ? 0 : result;
                    operator = null;
                    SecondOperand = null;
                    return;
                } else {
                    alert("please put number as  a secondOperand")
                    return
                }

            } else {

                // enter 3rd value;
                if (isNumber(key)) {
                    if (SecondOperand) {
                        SecondOperand += key
                    } else {
                        SecondOperand = key
                    }
                }
            }
        }
        setDisplayValue(firstOperand, operator, SecondOperand)
    })
})