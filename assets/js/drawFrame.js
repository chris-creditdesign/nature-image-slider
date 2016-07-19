BuildWidget.prototype.drawFrame = function() {
	var self = this;

	this.ctx.clearRect(0,0, this.params.width, this.params.height);
	
	/* Check that params.value is greater than 0 so we're not multiplying width by 0 */
	if (this.params.value > 0) {
		this.ctx.drawImage(this.params.allImages[1], 0, 0, (this.params.width * this.params.value), this.params.height, 0, 0, (this.params.width * this.params.value), this.params.height);
		this.ctx.drawImage(this.params.allImages[0], (this.params.width * this.params.value), 0, (this.params.width * (1 - this.params.value)), this.params.height, (this.params.width * this.params.value), 0, (this.params.width * (1 - this.params.value)), this.params.height);
	} else {
		this.ctx.drawImage(this.params.allImages[0], 0, 0, this.params.width, this.params.height, 0, 0, this.params.width, this.params.height);
	}
	
	this.ctx.beginPath();
	this.ctx.moveTo((this.params.width * this.params.value),0);
	this.ctx.lineTo((this.params.width * this.params.value), this.params.height);
	this.ctx.closePath();
	this.ctx.stroke();

};