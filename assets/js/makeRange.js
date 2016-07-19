/*	makeRange()
	Append an input[type="range"] and call drawFrame on change */
BuildWidget.prototype.makeRange = function() {
	var self = this;

	this.rangeInput.attr({
		"type" : "range",
		"min" : 0,
		"max" : this.images.length - 1,
		"step" : "any",
		"value" : this.params.startingValue
	});

	this.range = this.outerWrapper.find(".widget-selector");
	this.range.append(this.rangeInput);
	
	this.rangeInput.bind("input", function() {
		self.params.value = parseFloat(this.value);
		self.drawFrame();
	});
};
