
// 65 to "41"
Number.prototype.toHexStr = function() {
	if (this > 0xff) {
		return new Error("the value is out of range")
	}
	var hexStr = this.toString(16).toUpperCase();
	if (hexStr.length == 1) {
		hexStr = "0" + hexStr;
	}
	return hexStr;
};