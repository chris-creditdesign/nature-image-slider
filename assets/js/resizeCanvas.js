/*	resize()
	Redraw and resize the canvas if the window width changes */
BuildWidget.prototype.resizeCanvas = function() {
	var self = this;
	
	if(jQuery(window).width() != this.params.windowWidth) {
		
		this.params.windowWidth = jQuery(window).width();

		var size = getCanvasSize(this.params.widthAdjustment, this.params.heightRatio);

		this.params.width = size.width;
		this.params.height = size.height;

		this.imageCanvas.attr({
			"width": this.params.width,
			"height": this.params.height
		});

		this.ctx.strokeStyle = "#ffffff";
		this.ctx.lineWidth = 2;

		this.drawFrame();
	}
};
