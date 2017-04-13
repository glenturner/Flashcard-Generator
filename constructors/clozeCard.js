var ClozeCard = function (text, clozeDeletion){
	
	// holds start and end positions for cloze delete // 
	var clozePositions = clozeDelete(text, clozeDeletion);
	// builds the partial text // 
	this.partial = getPartial(text, clozePositions);
	// saves the cloze deleted text for later display // 
	this.cloze = text.slice(clozePositions[0], clozePositions[1]);

	}
function getPartial (partial, clozePositions){
	// find where cloze deletion begins//
	var start = partial.slice(0, clozePositions[0]);
 	// find where cloze ends //
 	var end = partial.slice(clozePositions[1], partial.length);
 	// return ommitted version // 
 	return start + "..." + end;

}
function clozeDelete(text, clozeDeletion){
	var start = text.indexOf(clozeDeletion);
	if (start !== -1){
		return [start, start + clozeDeletion.length];
	}
	throw new Error("Cloze deletion not found in input partial.");
}

ClozeCard.prototype.displayCard = function displayCard() {
	return this.partial.replace(/\.\.\./, "'" + this.cloze + "'");
};


 //Export the function
module.exports = ClozeCard;

