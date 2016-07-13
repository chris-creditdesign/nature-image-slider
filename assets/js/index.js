(function() {
	var init = function($) {
		var allImages = [];

		/* Store with window Width to stop iOS resizing on scroll */
		var windowWidth = $(window).width();
		
		var width = $("#content").width() * 0.9;
		var height = Math.floor(width * 0.62);

		var range;
		var select;
		var startingValue = 0.5;

		var outerWrapper = $(".outerwrapper");
		outerWrapper.find(".widget-selector").css("top", height * -1);

		var imageCanvas = $("<canvas></canvas>");
		var rangeInput = $("<input />");

		imageCanvas.attr({
			"width": width,
			"height": height
		});

		outerWrapper.find(".widget-canvas")
			.append(imageCanvas);

		var ctx = imageCanvas[0].getContext("2d");
		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = 2;
		
		var testInput = document.createElement("input");
		testInput.setAttribute("type", "range");

		var widgetImages = outerWrapper.select(".widget-images");
		
		/*	Select each of the images and push a new img object into
			the allImages array with the relevant src */
		var images = widgetImages.find("img");

		$.each(images, function (key, value) {
			var thisImage = new Image();
			thisImage.src = this.src;
			allImages.push(thisImage);
		});

		/*	drawFrame() num = value of input
			redraw the canvas */
		function drawFrame (num) {
			ctx.clearRect(0,0,width,height);

			ctx.fillStyle = "rgb(200,0,0)";
	        ctx.fillRect (0, 0, width, height);
			
			/* Check that num is greater than 0 so we're not multiplying width by 0 */
			if (num > 0) {
				ctx.drawImage(allImages[0], 0, 0, (width * num), height, 0, 0, (width * num), height);
				ctx.drawImage(allImages[1], (width * num), 0, (width * (1 - num)), height, (width * num), 0, (width * (1 - num)), height);
			} else {
				ctx.drawImage(allImages[1], 0, 0, width, height, 0, 0, width, height);
			}
			
			ctx.beginPath();
			ctx.moveTo((width * num),0);
			ctx.lineTo((width * num),height);
			ctx.closePath();
			ctx.stroke();
		}

		/*	makeRange()
			Append an input[type="range"] and call drawFrame on change */
		function makeRange () {
			
			rangeInput.attr({
				"type" : "range",
				"min" : 0,
				"max" : images.length - 1,
				"step" : "any",
				"value" : startingValue
			}).css("height",height);

			range = outerWrapper.find(".widget-selector");
			range.append(rangeInput);
			
			rangeInput.bind("input", function() {
				drawFrame(parseFloat(this.value));
			});
		}

		/*	makeSelect()
			Append a select element and call drawFrame on change */
		function makeSelect () {
			console.log("Let's call the whole thing off");
		}

		/*	resize()
			Redraw and resize the canvas */
		function resize () {
			if($(window).width() != windowWidth){
				
				windowWidth = $(window).width();
				width = $("#content").width() * 0.9;
				height = Math.floor(width * 0.62);

				imageCanvas.attr({
					"width": width,
					"height": height
				});

				ctx.strokeStyle = "#ffffff";
				ctx.lineWidth = 2;

				rangeInput.attr({"value": startingValue});
				drawFrame(startingValue);
			}
		}

		/* Fill the canvas image with frame 0 as soon as it is ready */
		allImages[0].onload = function() {
			drawFrame(startingValue);
		};

		allImages[1].onload = function() {
			drawFrame(startingValue);
		};

		/*	call makeRange() if input[type="range"] is suported
			call makeSelect() otherwise */
		if (testInput.type !== "text") {
			makeRange();
		} else {
			makeSelect();
		}

		window.onresize = resize;

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