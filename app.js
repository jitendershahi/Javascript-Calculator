(function () {

    //common function to get element
    function getElement(el) {
        if (el.charAt(0) == '#') {
            return document.querySelector(el)
        }
        return document.querySelectorAll(el)
    }

    // declare variables
    var viewer = getElement("#viewer"),
        equals = getElement("#equals"),
        number = getElement(".num"),
        operation = getElement(".ops"),
        previousNum = "",
        currentNum = "",
        resultNum,
        operator,
        clearAll = getElement("#clear")

    // When: Number is clicked. Get the current number selected
    for (var i = 0; i < number.length; i++) {
        number[i].onclick = setNumber
    }

    function setNumber() {
        if (resultNum) { // If a result was displayed, reset number
            resultNum = ""
            currentNum = this.getAttribute("data-num");
        } else { // Otherwise, add digit to previous number (this is a string!)
            currentNum += this.getAttribute("data-num");
        }
        viewer.innerHTML = currentNum;
    }

    // When: Operator is clicked. Pass number to oldNum and save operator
    for (var i = 0; i < operation.length; i++) {
        operation[i].onclick = setOperator
    }

    function setOperator() {
        previousNum = currentNum
        currentNum = ""

        operator = this.getAttribute("data-ops");
        equals.setAttribute("data-result", "") // Reset result in attr
    }


    // Add click event to equal sign
    equals.onclick = displayNum;

    function displayNum() {
        previousNum = parseFloat(previousNum)
        currentNum = parseFloat(currentNum)

        switch (operator) {
            case "plus":
                resultNum = previousNum + currentNum;
                break;

            case "minus":
                resultNum = previousNum - currentNum;
                break;

            case "multiply":
                resultNum = previousNum * currentNum;
                break;

            case "divide":
                resultNum = previousNum / currentNum;
                break;

            default:
                resultNum = currentNum
        }

        //check for NAN and Infinity
        if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) {
                resultNum = "You broke it!";
            } else {
                resultNum = "Look at what you've done";
            }
        }

        //Display result finally
        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);

        // Now reset oldNum & keep result
        previousNum = 0;
        currentNum = resultNum;
    }

    // Add click event to clear
    clearAll.onclick = clear;

    function clear() {
        previousNum = ""
        currentNum = ""
        viewer.innerHTML = "0"
        equals.setAttribute("data-result", resultNum)
    }

}());
