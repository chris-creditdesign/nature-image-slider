(function() {
		var init = function($)
		{


			$.getScript("http://www.nature.com/polopoly_static/js/d3.v3.min.js", function() {
				var allImages = [];
				var outerWrapper = d3.select(".outerwrapper");
				var canvas = outerWrapper.append("canvas")
											.attr("width", 630)
											.attr("height", 298);
				var ctx = canvas.node().getContext("2d");
				
				var testInput = document.createElement("input");
				testInput.setAttribute("type", "range");

				var images = outerWrapper.select(".widget-images")
								.selectAll("img")
								.each(function(d,i) {
									var thisImage = new Image();
									thisImage.src = this.src;

									allImages.push(thisImage);
								})
								.style("display","none");


				function drawFrame (num) {
					ctx.drawImage(allImages[num], 0, 0);
				}

				allImages[0].onload = function() {
					drawFrame(0);
				}

				function makeRange () {
					var range = outerWrapper.append("input")
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
					var select = outerWrapper.append("select");

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

				if (testInput.type !== "text") {
					makeRange();
				} else {
					makeSelect();
				}

			}); /* End of d3js getscript call

		/* End of active code */
		};


	setTimeout(function()
	{
	if (typeof jQuery !== 'undefined')
	{
		init(jQuery);
	} else
	{
		setTimeout(arguments.callee, 60);
	}
	}, 60);

})();