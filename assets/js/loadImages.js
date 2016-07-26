/*	loadImages()
	If the images are loaded, store them in the allImages array
	if there is a problem destroy the canvas and slider */
BuildWidget.prototype.loadImages = function() {
	var self = this;
	this.widgetImages = this.outerWrapper.find(".widget-images");
		
	/*	Select each of the images and push a new img object into
		the allImages array with the relevant src */
	this.images = this.widgetImages.find("img");
	
	var imageCount = this.images.length;

	function checkImagesLoaded() {
		if (self.params.loadError === false) {
			imageCount--;
		}
		
		if (imageCount === 0) {
			self.drawFrame();
			self.imageCanvas.removeClass("canvasInvisible");
		}
	}

	jQuery.each(self.images, function (key, value) {

		var thisImage = new Image();
		thisImage.src = this.src;
		self.params.allImages.push(thisImage);
		
		jQuery(this).load(checkImagesLoaded())
			.error(function(evt) {
				self.params.loadError = true;
				self.destroy();
			});		
	});
};
