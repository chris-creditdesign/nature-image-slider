/*	resize()
	Redraw and resize the canvas */
BuildWidget.prototype.resizeCanvas = function() {
	
	if(jQuery(window).width() != this.params.windowWidth) {
	console.log("We're resizing!");

		
		this.params.windowWidth = $(window).width();
		this.params.width = $("#content").width() * 0.9;
		this.params.height = Math.floor(this.params.width * this.params.heightRatio);

		this.imageCanvas.attr({
			"width": this.params.width,
			"height": this.params.height
		});

		this.ctx.strokeStyle = "#ffffff";
		this.ctx.lineWidth = 2;

		this.drawFrame();
	}
};