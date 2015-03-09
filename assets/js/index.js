(function() {
	var d3url = "http://www.nature.com/polopoly_static/js/d3.v3.min.js";

	/*	supports_canvas() - Check to see if the browser supports canvas
		return true if canvas supported */
	function supports_canvas() {
  		return !!document.createElement('canvas').getContext;
	}

	var init = function($) {
		$.when( $.getScript(d3url) ).then( function() {
			var allImages = [];

			/* Remove 2px from the width to acount for the border */
			var width = $("#content").width() - 2;
			var height = Math.floor(width * 0.48);

			var range;
			var select;
			var rangeWorking = false;

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
			
			/*	Select each of the images and push a new img object into
				the allImages array with the relevant src and alt properties */
			var images = widgetImages.selectAll("img")
							.each(function(d,i) {
								var thisImage = new Image();
								thisImage.src = this.src;
								thisImage.alt = this.alt;

								allImages.push(thisImage);
							});

			/*	drawFrame() num = value of input or select
				redraw the canvas and update the #date text */
			function drawFrame (num) {
				dateDisplay.text(allImages[num].alt);
				ctx.drawImage(allImages[num], 0, 0, width, height);
			}

			/*	makeRange()
				Append an input[type="range"] and call drawFrame on change */
			function makeRange () {
				range = outerWrapper.select(".widget-selector")
											.append("input")
											.attr("type","range")
											.attr("min", 0)
											.attr("max", (images[0].length - 1))
											.attr("step", 1)
											.attr("value", 0)
											.on("input", function() {
												rangeWorking = true;
												drawFrame(this.value);
											});				

				/*	selection.on("input") doesn't seem to work in ie
					repeating the call to drawFrame() here on slide end */
				jQuery(".outerwrapper input[type='range']").click(function(){
					this.blur();
					this.focus();
					drawFrame(this.value);
				});
			}

			/*	makeSelect()
				Append a select element and call drawFrame on change */
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

			/*	resize()
				Redraw and resize the canvas */
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

			/* Fill the canvas with frame 0 as soon as it is ready */
			allImages[0].onload = function() {
				drawFrame(0);
			};

			/*	call makeRange() if input[type="range"] is suported
				call makeSelect() otherwise */
			if (testInput.type !== "text") {
				makeRange();
			} else {
				makeSelect();
			}

			window.onresize = resize;

		}, function () {
			/*	D3 has failed to load so show the images */
			$(".widget-images").css("display","block");
		});
	};

	/*	Before calling init()
		- check jQuery is loaded
		- check the browser supports canvas
		- check the images are hidden */
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