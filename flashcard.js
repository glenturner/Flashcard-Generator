// This page builds a flash card // 
var inquirer = require('inquirer'),
 fs = require('fs'),
 basic = require('./basicCard'),
 cloze = require('./clozeCard'),
 points = 0;

inquirer.prompt([{
 type: 'list',
 message: 'What would you like to do?',
 choices: ['Make Flashcard', 'Take Quiz'],
 name: 'action'
}]).then(function(data) {
 switch (data.action) {
  case 'Make Flashcard':
   inquirer.prompt([{
    type: 'list',
    message: 'What type of card?',
    choices: ['Cloze', 'Basic'],
    name: 'cardType'
   }]).then(function(data) {
    switch (data.cardType) {
     case 'Cloze':
      console.log('Creating cloze card');
      inquirer.prompt([{
       type: 'input',
       message: 'Full Text',
       name: 'fullText'
      }, {
       type: 'input',
       message: 'Answer',
       name: 'answer'
      }]).then(function(data) {
       var clozeCard = new cloze(data.answer, data.fullText);
       console.log(clozeCard);
       fs.appendFile('log.txt', JSON.stringify(clozeCard), function(error) {
        if (error) {
         console.log('error', error);
        }
       })
      });
      break;
     case 'Basic':
      console.log('Creating basic card');
      inquirer.prompt([{
       type: 'input',
       message: 'Question',
       name: 'question'
      }, {
       type: 'input',
       message: 'Answer',
       name: 'answer'
      }]).then(function(data) {
       var basicCard = new basic(data.question, data.answer);
       console.log(basicCard);
       fs.appendFile('log.txt', ',' + JSON.stringify(basicCard), function(error) {
        if (error) {
         console.log('error', error);
        }
       })
      });
      break;
    }
   });
   break;
  case 'Take Quiz':
   console.log('The quiz will begin now!');
   var cards = [];
   var cardsLength = cards.length;
   fs.readFile("log.txt", "utf8", function(error, data) {
    if (error) {
     console.log('error', error);
    }
    cards.push(data);
    for (var i = 0; i < cardsLength; i++) {
     var message = "test";
     console.log(cardtest.front);
     inquirer.prompt([{
      type: 'input',
      message: message,
      name: 'userGuess'
     }]).then(function(data) {
      if (data.userGuess == cards[i].back) {
       points++;
       console.log('Thats correcet!')
      } else {
       console.log('Thats incorrect, the answer is: ' + cards[i].back);
      }

     });

     // }

    }
    // console.log('Great job! You scored ' + points + ' points!');
   });
   break;
  default:
   console.log('something went wrong');
 }
});