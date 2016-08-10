
// "ABCDE" to "4142434445"
String.prototype.str2HexStr = function() {
	var sb = new Array();
	for (var i = this.length - 1; i >= 0; i--) {
		sb[i] = String.charCodeAt(this[i]).toHexStr();
	}
	return sb.join("");
};

// "4142434445" to "ABCDE"
String.prototype.hexStr2Str = function() {
	if (this.length%2 != 0) {
		return alert("The Length of String is illeagality!")
	}
	var sb = new Array();
	for (var i = 0; i < this.length/2; i++) {
		sb[i] = String.fromCharCode(parseInt(this.substr(i*2, 2), 16));	
	}
	return sb.join("");
};

// "313233" xor "333435" = "050705"
String.prototype.xorHexString = function(str) {
	var bytes = this.hexStr2NumberArray();
	return bytes.xorArray(str.hexStr2NumberArray()).toHexStr();
};

// "123456" to [49,50,51,52,53,54]
String.prototype.str2NumberArray = function() {
	var arr = new Array();
	for (var i = this.length - 1; i >= 0; i--) {
		arr.push(String.charCodeAt(this[i]));
	}
	return arr;
};

// "313233343536" to [49,50,51,52,53,54]
String.prototype.hexStr2NumberArray = function() {
	if (this.length%2 != 0) {
		return alert("The Length of String is illeagality!")
	}
	var arr = new Array();
	for (var i = 0; i < this.length/2; i++) {
		arr.push(parseInt(this.substr(i*2, 2), 16));	
	}
	return arr;
};

String.prototype.toArray = function() {
	var strArray = new Array(this.length);
	for (var i = this.length - 1; i >= 0; i--) {
		strArray[i] = this.charCodeAt(i);
	}
	return strArray;
};