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

	function loaded(img, index) {
		self.params.allImages[index] = img;
		checkAllImagesLoaded();
	}

	function checkAllImagesLoaded(img) {
		if (self.params.loadError === false) {
			imageCount--;
		}
		
		if (imageCount === 0) {
			self.drawFrame();
			self.imageCanvas.removeClass("canvasInvisible");
		}
	}

	self.images.get().forEach(function(elem,index,array) {
		var thisImage = new Image();
		thisImage.src = elem.src;

		if (thisImage.complete) {
			loaded(thisImage, index);
		} else {
			thisImage.addEventListener('load', function() {
				loaded(this, index);
			});
		}

		thisImage.addEventListener("error", function(e) {
			console.log("There has been an error!");
			console.log(e);
			self.params.loadError = true;
			self.destroy();
		});
	});
};
