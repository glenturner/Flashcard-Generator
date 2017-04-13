var inquirer = require('inquirer'),
 fs = require('fs'),
 clozeCard = require('./constructors/clozeCard'),
 cloze = require('./constructors/clozeCard'),
 clozeJson = require('./clozeQuestions.json'),
 colors = require('colors')



startGame();
function startGame (){
	var currentCard,
		cardArray = [],
		initialScore = 0,
		currentIndex = 0;
	// Creating a new card by looping through the JSON file // 
	for (var i = 0; i < clozeJson.length; i++) {
		// create a new instance of a basic card // 
	currentCard = new clozeCard(clozeJson[i].partial, clozeJson[i].cloze)
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
	 message: card.partial + "\nAnswer: "
	}]).then(function(answer){
		if(answer.text.trim().toLowerCase() === card.cloze.trim().toLowerCase()){
			initialScore++;
			console.log("**************************************************************".rainbow);
			console.log("Thats correct! Your score went up to ".rainbow + initialScore);
			console.log("**************************************************************".rainbow);
		} else {
			console.log("***************************************************************".red);
			console.log("That is incorrect, The correct answer is: ".red + card.cloze.red);
			console.log("***************************************************************".red);
		}
		
		console.log(card.displayCard());
		currentIndex++;
		
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
	}]).then(function(answer) {
		if (answer.text === "yes"){
			console.log("StartGame!! Answer these Questions.".green);
			startGame();
		} 
		console.log("Thanks for playing!".blue);	
	});
}
