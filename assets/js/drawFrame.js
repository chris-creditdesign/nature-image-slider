/*	drawFrame()
	Draw the image segments onto the canvas and add a white line on the divide */
BuildWidget.prototype.drawFrame = function() {
	var self = this;

	var canvasFullHeight = this.params.height;
	var canvasFullWidth = this.params.width;

	var imageFullWidth = this.params.allImages[0].width;
	var imageFullHeight = this.params.allImages[0].height;

	var leftImage = this.params.allImages[1];
	var rightImage = this.params.allImages[0];



	var leftImageWidth = imageFullWidth * this.params.value;
	var leftCanvasWidth = canvasFullWidth * this.params.value;

	var rightImageX = imageFullWidth * this.params.value;
	var rightImageWidth = imageFullWidth * (1 - this.params.value);
	var rightCanvasX = canvasFullWidth * this.params.value;
	var rightCanvasWidth = canvasFullWidth * (1 - this.params.value);

	this.ctx.clearRect(0,0, canvasFullWidth, canvasFullHeight);

	/*	Check that params.value is greater than 0 so we're not multiplying width by 0
		and less than 1.
	*/
	if (this.params.value > 0 && this.params.value < 1) {
		this.ctx.drawImage(leftImage, 0, 0, leftImageWidth, imageFullHeight, 0, 0, leftCanvasWidth, canvasFullHeight);
		this.ctx.drawImage(rightImage, rightImageX, 0, rightImageWidth, imageFullHeight, rightCanvasX, 0, rightCanvasWidth, canvasFullHeight);
	}  else if (this.params.value >= 1) {
		this.ctx.drawImage(leftImage, 0, 0, imageFullWidth, imageFullHeight, 0, 0, canvasFullWidth, canvasFullHeight);
	}	else {
		/* We can now presume that this.params.value is 0 */
		this.ctx.drawImage(rightImage, 0, 0, imageFullWidth, imageFullHeight, 0, 0, canvasFullWidth, canvasFullHeight);
	}

	this.ctx.beginPath();
	this.ctx.moveTo((canvasFullWidth * this.params.value),0);
	this.ctx.lineTo((canvasFullWidth * this.params.value), canvasFullHeight);
	this.ctx.closePath();
	this.ctx.stroke();
};
