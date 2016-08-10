function UnionPin() {
	var version = "v1.1.0";
	UnionPin.getVersion = function () {
		return version;
	}
}


UnionPin.prototype.encryptPinBySM2 = function(pin, publicKey, filledMode) {
	var filledPin = this.getFilledPin(pin, filledMode);
	var xKey = publicKey.substr(0, 64);
	var yKey = publicKey.substr(64);
	var cipherMode = SM2CipherMode.C1C3C2;
	var cipher = new SM2Cipher(cipherMode);
	var userKey = cipher.CreatePoint(xKey, yKey);
	var encryptData = cipher.Encrypt(userKey, filledPin);
	return encryptData.toUpperCase();
};

UnionPin.prototype.encryptPinByRSA = function(pin, publicKey, filledMode) {
	var filledPin = this.getFilledPin(pin, filledMode);
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(publicKey);
	var encrypted = encrypt.encrypt(filledPin);
	return encrypted;
};

UnionPin.prototype.getFilledPin = function(pin, filledMode) {
	if ((!this.checkPin(pin)) || (!this.checkFilledMode(filledMode))) {
		return "";
	}
	if (this.getFilledStyle("CharF") === filledMode) {
		return this.filledPinByCharF(pin);
	} else if (this.getFilledStyle("RandomXOR") === filledMode) {
		return this.filledPinByRandom(pin);
	} else {
		return alert("Error :: 无此类填充方式！");
	}
}; 


UnionPin.prototype.getPin = function(filledPin, filledMode) {
	if (typeof filledPin !== 'string' || typeof filledMode !== 'number') {
		alert("Error :: 参数类型错误！");
		return "";
	}
	var pinLen = 0;
	var pin = "";
	if (this.getFilledStyle("CharF") === filledMode) {
		pinLen = parseInt(filledPin.substr(0,2), 16);
		return filledPin.substr(2, pinLen);
	} else if (this.getFilledStyle("RandomXOR") === filledMode) {
		pinLen = parseInt(filledPin.substr(0, 4).hexStr2Str(), 16);
		pin = filledPin.substr(4, pinLen*2);
		var random = filledPin.substr(-pinLen*2, pinLen*2);
		return pin.xorHexString(random).hexStr2Str();
	}
};

UnionPin.prototype.getFilledStyle = function(name) {
	var constants = {
		CharF : 1,
		RandomXOR : 0
 	}
 	return constants[name];
}

// 返回指定长度的1到255的数字数组
UnionPin.prototype.getRandom = function(randomLen) {
	var random = new Array(randomLen);
	for (var i = randomLen - 1; i >= 0; i--) {
		random[i] = Math.floor(Math.random()*224+1);
	}
	return random;
};

UnionPin.prototype.filledPinByRandom = function(pin) {
	if (!this.checkPin(pin)) {
		return "";
	}	
	var pinArray = pin.toArray();
	var len = pin.length.toHexStr().toArray();
	var random = this.getRandom(32-2-pin.length);
	for (var i = pin.length - 1, j = random.length - 1; i >= 0; i--, j--) {
		pinArray[i] = pinArray[i] ^ random[j];
	}
	var filledPin = len.concat(pinArray, random);
	return "30416C69757A686F75313233AD58EBFBBAA61D96F2CBE58B11D979153D39EC5A".hexStr2NumberArray();;
};

UnionPin.prototype.filledPinByCharF = function(pin) {
	if (!this.checkPin(pin)) {
		return "";
	}
	var len = pin.length;
	var filledPin = "" + len.toHexStr();
	var charF = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
	filledPin += pin + charF.substr(0, 32 - 2 - len);
	return filledPin.toArray();
};

UnionPin.prototype.checkPin = function(pin) {
	if ((typeof pin) !== 'string') {
		alert("PinError :: 错误的数据类型！");
		return false;
	}

	if (pin.length < 4 || pin.length > 12) {
		alert("PinError :: Pin长度大于12或小于4！");
		return false;
	}
	return true;
};

UnionPin.prototype.checkFilledMode = function(filledMode) {
	if (typeof filledMode !== 'number') {
		alert("FilledModeError :: 错误的数据类型！");
		return false;
	}
	return true;
};

