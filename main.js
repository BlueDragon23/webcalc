
var currentTerm = "";
var terms = [];
var operators = [];
var history = [];
var evaulated = false; // Has the calculator just evaluated a sum

$(".number").click(function() { 
	if (evaulated) {
		// Clear the output
		$("#output").html("");
		evaulated = false;
	}
	currentTerm += $(this).html();
	$("#output").html($("#output").html() + $(this).html());
});

$(".operator").click(function() {
	if (currentTerm !== "") { 
		// A number should be entered before an operator
		terms.push(currentTerm);
		currentTerm = "";
		console.log(terms);
		operators.push($(this).html());
		console.log(operators);
		$("#output").html($("#output").html() + $(this).html());
	}
});

$("#return").click(function() {
	if (currentTerm === "") {
		// The last entry was an operator, or there are no entries
		return;
	} else {
		terms.push(currentTerm);
		currentTerm = "";
		console.log(terms);
		console.log(operators);
		// First evaluate the exponentiation
		while ((mdIndex = operators.findIndex(function(oper) {return oper === "^";})) >= 0) {
			leftTerm = terms[mdIndex];
			rightTerm = terms[mdIndex + 1]
			if (operators[mdIndex] === "^") {
				terms.splice(mdIndex, 2, Math.pow(leftTerm, rightTerm));
			}
			operators.splice(mdIndex, 1);
		}
		// Then evaluate the multiplication and division
		while ((mdIndex = operators.findIndex(function(oper) {return oper === "*" || oper === "/";})) >= 0) {
			leftTerm = terms[mdIndex];
			rightTerm = terms[mdIndex + 1]
			if (operators[mdIndex] === "*") {
				terms.splice(mdIndex, 2, leftTerm * rightTerm);
			} else {
				terms.splice(mdIndex, 2, leftTerm / rightTerm);
			}
			operators.splice(mdIndex, 1);
		}
		var sum = Number(terms.shift()), op = "";
		// No multiplication or division, reduce the array
		while (terms.length > 0) {
			if ((op = operators.shift()) === "+") {
				sum += Number(terms.shift());
			} else if (op === "-") {
				sum -= Number(terms.shift());
			}
		}
		console.log(sum);
		$("#output").html(sum); // Update the output
		evaulated = true;
		history.push(sum);
	}
});