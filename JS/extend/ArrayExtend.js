
// [49,50,51] to "123"
Array.prototype.toAscStr = function() {
	var ascStr = new Array();
	for (var i = 0; i < this.length; i++) {
		ascStr[i] = String.fromCharCode(this[i]);
	}
	return ascStr.join("");
};

// [49,50,51] to "313233"
Array.prototype.toHexStr = function() {
	var hexStr = new Array();
	for (var i = 0; i < this.length; i++) {
		hexStr[i] = this[i].toHexStr();
	}
	return hexStr.join("");
};

// [49,50,51] ^ [52,53,54] = [5,7,5]
Array.prototype.xorArray = function(arr) {
	if (this.length != arr.length) {
		return new Error("Two Arrays length is different!");
	}
	var xorArr = new Array();
	for (var i = 0; i < this.length; i++) {
		xorArr[i] = this[i] ^ arr[i];
	}
	return xorArr;
};

