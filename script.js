
/**
 * @author - Dominick Fabry
 * 
 *  IPhone Calculator App Version 0.2.0
 * 
 * 
 * Need to update visuals to IPhone calculator app
 *      - Large 0 Button
 *      - Circular Buttons
 *      - Change Colors Back
 *      - Find way to make animations for buttons 
 *          (delayed hover trigger almost like a pulse of light when pressed, operations glow white after pressed until fulfilled)
 *      - Find way to fix display not showing properly when using updates buttons.
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
 * 
 *  - Implement Inverse Operator
 *          Must work for both flipping to neg and flipping to pos (Evaluates and displays right away????)
 *          Multiply by -1
 * 
 *  - Implement Percent Operator
 *           Multiply by 0.1
 * 
 *  - Implement Equals Operator 
 *           Multiple '=' inputs
 *          (Ex. Input: 2*1= Output = 2
 *               Input: = Output: 4)
 *           Re-pressing '=' executes the previous operation  ie. 2*2+1 wil continously add 1 to total (must investigate further????)
 * 
 *  - Implement All Other Operators
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
        this.currentOperand = this.currentOperand.toString() + number.toString()
        const hello = 0
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
     */
     compute() {
        let comp
        const prev = parseFloat(this.previousOperand)
        const cur = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(cur)) return
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
            case '%':
                comp = cur*0.01
                this.currentOperand = comp
                return

            case '+/-':
                comp = cur* -1
                this.currentOperand = comp
                return
            default:
                return

        }
        this.currentOperand = comp
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNum(number) {
        const num = number.toString()
        const integers = parseFloat(num.split('.')[0])
        const decimals = num.split('.')[1]
        const float = parseFloat(number)
        let display
        if (isNaN(integers)) {
            display = ''
        } else {
            display = integers.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimals != null) {
            return `${integers}.${decimals}`
        } else {
            return integers
        }
    }

    /**
     * 
     */
    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNum(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandText.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        }
        else
            this.previousOperandText.innerText = ''


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



clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})







