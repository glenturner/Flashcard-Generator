var inquirer = require('inquirer'),
 fs = require('fs'),
 basicCard = require('./constructors/basicCard'),
 cloze = require('./constructors/clozeCard'),
 basicJson = require('./basicQuestions.json'),
 colors = require('colors'),
 points = 0


startGame();
function startGame (){
	var currentCard,
		cardArray = [],
		initialScore = 0,
		currentIndex = 0;
	// Creating a new card by looping through the JSON file // 
	for (var i = 0; i < basicJson.length; i++) {
		// create a new instance of a basic card // 
	currentCard = new basicCard(basicJson[i].front, basicJson[i].back)
	cardArray.push(currentCard);
	}
	askQuestion(initialScore, cardArray, currentIndex);
}

function askQuestion(initialScore, cardArray, currentIndex){
	// store our current card into a variable // 
	var card = cardArray[currentIndex];

	// show the user the card // 
	inquirer.prompt([{
	 type: 'input',
	 name: 'text',
	 message: card.front + "\nAnswer: "
	}]).then(function(answer){
		if(answer.text.trim().toLowerCase() === card.back.trim().toLowerCase()){
			initialScore++;
			console.log("**************************************************************".rainbow);
			console.log("Thats correct! Your score went up to ".rainbow + initialScore);
			console.log("**************************************************************".rainbow);
		} else {
			console.log("***************************************************************".red);
			console.log("That is incorrect, The correct answer is: ".red + card.back.red);
			console.log("***************************************************************".red);
		}
		currentIndex++;
		console.log("index = "+ currentIndex);
		if (currentIndex < cardArray.length){
			askQuestion(initialScore, cardArray, currentIndex);
		} else {
			endGame(initialScore);
		}
	});
	
}

function endGame (initialScore){
	console.log("**************************************************************".green);
	console.log("Great Job, Game Over! Your score is: ".green + initialScore);
	console.log("**************************************************************".green);
	inquirer.prompt([{
	 type: 'input',
	 name: 'text',
	 message: "\nDo you want to play again? Yes or No?".inverse
	}]).then(function(answer){
		if (answer.text === "yes"){
			startGame();
		} else {
			console.log("Thanks for playing!".blue);
		}
	});
}


