/*	destroy()
	If it's not possible to build the canvas or the slider
	remove them both and show the original images */
BuildWidget.prototype.destroy = function() {

	this.imageCanvas.remove();
	this.rangeInput.remove();
	this.widgetImages.css("display","block");
};
