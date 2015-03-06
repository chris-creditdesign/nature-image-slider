
(function() {
	/**
	 * supports_canvas() - Check to see if the browser supports canvas
	 * http://diveintohtml5.info/detect.html#canvas
	 * @return true if canvas supported
	 */
	function supports_canvas() {
  		return !!document.createElement('canvas').getContext;
	}

	var init = function($) {
		$.getScript("http://www.nature.com/polopoly_static/js/d3.v3.min.js", function() {
			var allImages = [];

			var width = $("#content").width();
			var height = Math.floor(width * 0.48);

			var range;
			var select;

			var outerWrapper = d3.select(".outerwrapper");
			var canvas = outerWrapper.select(".widget-canvas")
										.append("canvas")
										.attr("width", width)
										.attr("height", height);
			var ctx = canvas.node().getContext("2d");

			var dateDisplay = outerWrapper.select("#date");
			
			var testInput = document.createElement("input");
			testInput.setAttribute("type", "range");

			var widgetImages = outerWrapper.select(".widget-images");
							
			var images = widgetImages.selectAll("img")
							.each(function(d,i) {
								var thisImage = new Image();
								thisImage.src = this.src;
								thisImage.alt = this.alt;

								allImages.push(thisImage);
							});

			function drawFrame (num) {
				dateDisplay.text(allImages[num].alt);
				ctx.drawImage(allImages[num], 0, 0, width, height);
			}

			function makeRange () {
				range = outerWrapper.select(".widget-selector")
											.append("input")
											.attr("type","range")
											.attr("min", 0)
											.attr("max", (images[0].length - 1))
											.attr("step", 1)
											.attr("value", 0)
											.on("input", function() {
												drawFrame(this.value);
											});
			}

			function makeSelect () {
				select = outerWrapper.select(".widget-selector")
								.append("select");

				select.selectAll("option")
					.data(images[0])
					.enter()
					.append("option")
					.attr("value", function(d,i) {
						return i;
					})
					.text(function(d,i) {
						return d.alt;
					});

				select.on("change", function() {
					drawFrame(this.value);
				});
			}

			/**
			 * [resize description]
			 * @return {[type]} [description]
			 */
			function resize () {
				if($(window).width() != width){
					var currentFrame;
					width = $("#content").width();
					height = Math.floor(width * 0.48);

					canvas.attr("width", width)
							.attr("height", height);

					if (range) {
						currentFrame = range.node().value;
					} else if (select) {
						currentFrame = select.node().value;
					} else {
						currentFrame = 0;
					}

					drawFrame(currentFrame);
				}
			}

			allImages[0].onload = function() {
				drawFrame(0);
			};

			if (testInput.type !== "text") {
				makeRange();
			} else {
				makeSelect();
			}

			window.onresize = resize;
		});
	};

	/*	jQuery ready check for canvas */
	setTimeout(function() {
		if (typeof jQuery !== 'undefined') {
			if ( supports_canvas() ) {
				if (jQuery(".widget-images").css("display") !== "none") {
					jQuery(".widget-images").css("display","none");
				}
				init(jQuery);
			} else {
				jQuery(".widget-images").css("display","block");
			}
		} else {
			setTimeout(arguments.callee, 60);
		}
	}, 60);

})();