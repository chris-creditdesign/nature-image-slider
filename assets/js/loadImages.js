BuildWidget.prototype.loadImages = function() {
	var self = this;
	this.widgetImages = this.outerWrapper.select(".widget-images");
		
	/*	Select each of the images and push a new img object into
		the allImages array with the relevant src */
	this.images = this.widgetImages.find("img");
	
	var imageCount = this.images.length;

	function checkImagesLoaded() {
		imageCount--;
		
		if (imageCount === 0) {
			self.drawFrame();
		}
	}

	// /* Fill the canvas image with frame 0 as soon as it is ready */
	// allImages[0].onload = checkImagesLoaded();
	// allImages[1].onload = checkImagesLoaded();

	$.each(self.images, function (key, value) {

		var thisImage = new Image();
		thisImage.src = this.src;
		self.params.allImages.push(thisImage);
		
		$(this).error(function(evt) {
			console.log("We have an error!");
		}).load(checkImagesLoaded());
	});
};