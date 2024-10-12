"use strict";

let $ = (id) => document.getElementById(id);
let $$ = (name) => document.getElementsByClassName(name);

let problems = []; // <string, string>
let max = 1;
let index = 0;

let start = () => {
	max = $('max').value;
	
	for (let o of $$('option')) {
		if($(o.id).checked) {
			addProblems(o.id);
		}
	}
			
	shuffle();
	
	$("game").style.display="flex";
    $("config").style.display="none";
    index = 0;
    nextCard();
}

let shuffle = () => {
	for (let i = 0; i < problems.length; i++) {
        let temp = problems[i];
        let rand = Math.floor(Math.random() * (problems.length));
        problems[i] = problems[rand];
        problems[rand] = temp;
    }
}

let addProblems = (type) => {
	let f = functionGenerator(type);
	
	for (let i = 1; i <= max; i++) {
		for (let j = 1; j <= max; j++) {
			problems.push(f(i,j));
		}
	}
}

let functionGenerator = (type) => {
	switch (type) {
		case "addition":
			return (a, b) => [`${a} + ${b}`, `${a + b}`]
		case "subtraction":
			return (a, b) => [`${a + b} - ${b}`, `${a}`]
		case "multiplication":
			return (a, b) => [`${a} * ${b}`, `${a * b}`]
		case "division":
			return (a, b) => [`${a * b} \u00F7 ${b}`, `${a}`];
	}
}

let nextCard = () => {
    if (problems.length > 0) {
        if (index >= problems.length ) {
            index = 0;
        }

        $("card").innerHTML = problems[index][0];
    } else {
        $("game").style.display="none";
        $("config").style.display="flex";
    }
	
	$("good").disabled = false;
};

let good = () => {
    problems.splice(index, 1);
    nextCard();
};

let answer = () => {
	$("card").innerHTML = problems[index][1];
	$("good").disabled = true;
};

let review = () => {
    index++;
    nextCard();
};