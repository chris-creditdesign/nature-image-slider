(function() {
	var d3url = "http://www.nature.com/polopoly_static/js/d3.v3.min.js";

	var init = function($) {
		$.when( $.getScript(d3url) ).then( function() {
			var allImages = [];

			/* Store with window Width to stop iOS resizing on scroll */
			var windowWidth = $(window).width();
			/* Remove 2px from the width to acount for the border */
			var width = $("#content").width() - 2;

			var range;
			var select;
			var rangeWorking = false;

			var outerWrapper = d3.select(".outerwrapper");

			var imageCanvas = outerWrapper.select(".widget-canvas")
										.append("img");

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
				imageCanvas.attr("src", allImages[num].src)
							.attr("alt", allImages[num].alt);
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
				if($(window).width() != windowWidth){
					
					windowWidth = $(window).width();
					width = $("#content").width();

					outerWrapper.style("width", width + "px");
				}
			}

			/* Fill the canvas image with frame 0 as soon as it is ready */
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
			jQuery(".widget-images").css("display","block");
		});
	};

	/*	Before calling init()
		- check jQuery is loaded
		- check the images are hidden */
	setTimeout(function() {
		if (typeof jQuery !== 'undefined') {
			if (jQuery(".widget-images").css("display") !== "none") {
				jQuery(".widget-images").css("display","none");
			}
			init(jQuery);
		} else {
			setTimeout(arguments.callee, 60);
		}
	}, 60);

})();