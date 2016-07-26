/*	buildCanvas()
	create the canvas and add event listeners for mouse and touch */
BuildWidget.prototype.buildCanvas = function() {
	var self = this;

	this.imageCanvas.attr({
		"width": self.params.width,
		"height": self.params.height
	}).addClass("canvasInvisible");

	this.outerWrapper.find(".widget-canvas")
		.append(self.imageCanvas);

	this.ctx = this.imageCanvas[0].getContext("2d");

	this.ctx.strokeStyle = this.params.strokeStyle;
	this.ctx.lineWidth = this.params.lineWidth;

	jQuery("body").bind(this.params.startEvent, function() {
		self.params.mouseDown = true;
	});

	jQuery("body").bind(this.params.endEvent, function() {
		self.params.mouseDown = false;
	});

	/* Listen for click 'n drag or swiping on the canvas */
	this.imageCanvas.bind(this.params.moveEvent, function (evt) {
		
		var mousePos = self.getMousePos(evt);
		self.params.value = mousePos.x / self.params.width;
		
		if (self.params.mouseDown) {
			self.drawFrame();
			self.rangeInput.prop("value", self.params.value);
		}
	});
};
