function StringBuffer() {
	this.strArray = new Array();
}

StringBuffer.prototype.append = function(str) {
	return this.strArray.push(str);
};

StringBuffer.prototype.toString = function() {
	return this.strArray.join("");
};