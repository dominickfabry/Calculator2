
/**
 * @author - Dominick Fabry
 * 
 * 
 * 
 *  IPhone Calculator App Version 0.2.0
 * 
 * 
 * Need to update visuals to IPhone calculator app
 *      - Find way to make animations for buttons 
 *          (delayed hover trigger almost like a pulse of light when pressed, operations glow white after pressed until fulfilled)
 * 
 * Delete button and clear button need to be the same, add more functionaly so AC button works as both
 *  (AC Text must swtich to 'C' when not all clearing, Switches to 'C' still need to understand???)
 *  (Need to be so delete reverses previous operation that occured????? Need to check more into this)
 * 
 * Only display the current operand, change as new numbers are being added to equation
 *      (Ex.    Display: Input:4
 *              Display: 4: input: +
 *              Display: 4 (+ is highlighted) Input: 8
 *              Display: 8 Input: =
 *              Display: 12 )

 *  - Implement Equals Operator 
 *           Multiple '=' inputs
 *          (Ex. Input: 2*1= Output = 2
 *               Input: = Output: 4)
 *           Re-pressing '=' executes the previous operation  ie. 2*2+1 wil continously add 1 to total (must investigate further????)
 * 
 *  - Add more documentation to all source files.
 * 
 *  
 */


class Calculator {

    /**
     * 
     * Constructor for creating a new Calculator.  Calculator is initlized, with buttons being able to interact with it.
     * 
     * @param {*} previousOperandText - Initilized previous value number inputed.
     * @param {*} currentOperandText  - Initilized current value number inputed.
     */

    constructor(previousOperandText, currentOperandText) {

        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }
    /**
     * Method clears the calculator of all current information, sets current and previous operands to empty string (clears it).
     * Operation instance variable is intilized undefined when a new Calculator is first constructed.
     */

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    /**
     * 
     * 
     * Migrate clear into this so AC button works on delete as well as ALL Clear
     */

    delete() {

    }

    /**
     * Method appends inputed numbers to the end of the current operand being created.
     * 
     * @param {*} number - Number to be appended to the current operand.
     */

    appendNum(number) {
        //If the number passed is a decimal point, checks if decimal is already in the current number and exits early if it does.
        if (number === '.' && this.currentOperand.includes('.')) return
        //Appends new number to current operand.
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    /**
     * Method sets the desired operation as it is inputed. 
     * Current operand is pushed to previous opperand in preperation for second number to complete arithmetic statement.
     * 
     * @param {*} operation - Current operator being used.
     */
    chooseOperation(operation) {
        //If the current operand is nothing, exit early as an operator can not act on nothing.
        if (this.currentOperand === '') return
        //If the previous operand is a valid number, computes the arthmetic statemnt with   previousOperand do operation on currentOperand.
        if (this.previousOperand !== '') {
            this.compute()
        }
        //Sets current operator to the inputed operator.
        this.operation = operation
        //Current operand is given an operator, must be moved to previous operand to prepare for incoming second number.
        this.previousOperand = this.currentOperand
        //Set current operand to empty string in preperation
        this.currentOperand = ''

    }
    /**
     * 
     * Method is used to apply a percentage modifer and an inverse moddifier on the current operand.
     * 
     * @param {*} extraOp - Current operator being applied to a current operand.
     * @returns - Exit early if there is not current operand.
     */
    inLineOperators(extraOp) {
        //If checks if there is a current operand for operator to be applied to.
        if (this.currentOperand == '')
            return
        //If else checks which operator is inputed.
        if (extraOp == "+/-")
            this.currentOperand = parseFloat(this.currentOperand) * -1
        else
            this.currentOperand = parseFloat(this.currentOperand) * 0.01
    }

    /**
     * Method takes current and previous opperand, and performs the inputed operator on them.  
     */

    compute() {
        //Initilize variables for computed value, current operand, and previous opperand.
        let comp
        const prev = parseFloat(this.previousOperand)
        const cur = parseFloat(this.currentOperand)
        //If either the previous or current operand does not exist, exit before computation as both are required.
        if (isNaN(prev) || isNaN(cur)) return
        //Switch statement for various operations.
        switch (this.operation) {
            case '+':
                comp = prev + cur
                break
            case '-':
                comp = prev - cur
                break
            case '÷':
                comp = prev / cur
                break
            case '×':
                comp = prev * cur
                break
            default:
                return

        }
        //Set current operand to the new computed number, default current operation to undefined, and clears the previous operand.
        this.currentOperand = comp
        this.operation = undefined
        this.previousOperand = ''

    }
    /**
     * Method updates the display number so commas are placed in correct locations in the display number.  
     *
     * 
     * @param {*} number - Number to be displayed.
     * @returns - Returns concatination of integer and decimal portions of number, or just the integer portion.
     */
    getDisplayNumber(number) {
        //Initlize current number to be displayed, integer portion of this number, and decimal portion of this number.
        const num = number.toString()
        const integer = parseFloat(num.split('.')[0])
        const decimal = num.split('.')[1]
        let display
        //If integer is not a number, set integer portion of display to empty, prepare for decimal portion.
        if (isNaN(integer)) {
            display = ''
            //Else number has integer portion, inserts commas into correction positions.
        } else {
            display = integer.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        //If the number has a decimal portion, concatinates current display number with the decimal portion.
        if (decimal != null) {
            return `${display}.${decimal}`
            //Else return current display number.
        } else {
            return display
        }
    }

    /**
     * Method is used to update the current display everytime a new number is inputed.
     */
    updateDisplay() {
        //Updates the display current opperand to the new current opperand. 
        this.currentOperandText.innerText =
            this.getDisplayNumber(this.currentOperand)
        //If an operation was inputed, concatinates previous operand with operation symbol. 
        if (this.operation != null) {
            this.previousOperandText.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            //Else no operation was inputed, ensure previous operand is still empty.
        } else {
            this.previousOperandText.innerText = ''
        }
    }
}





const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const functionButtons = document.querySelectorAll('[data-function]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')
const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })

})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

functionButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.inLineOperators(button.innerText)
        calculator.updateDisplay()
    })
})


clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})







