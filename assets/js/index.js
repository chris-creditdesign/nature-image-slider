(function() {
	var init = function($) {
		var allImages = [];

		/* Store with window Width to stop iOS resizing on scroll */
		var windowWidth = $(window).width();
		
		var range;
		var select;
		var startingValue = 0.5;
		var heightRatio = 0.6667;
		var strokeStyle = "#ffffff";
		var lineWidth = 2;

		var width = $("#content").width() * 0.9;
		var height = Math.floor(width * heightRatio);

		var touchSupported = 'ontouchstart' in window;
		var startEvent = touchSupported ? 'touchstart' : 'mousedown';
		var moveEvent = touchSupported ? 'touchmove' : 'mousemove';
		var endEvent = touchSupported ? 'touchend' : 'mouseup';
		var mouseDown = false;

		$("body").bind(startEvent, function() {
			mouseDown = true;
		});

		$("body").bind(endEvent, function() {
			mouseDown = false;
		});

		var outerWrapper = $(".outerwrapper");

		var imageCanvas = $("<canvas></canvas>");
		var rangeInput = $("<input />");

		imageCanvas.attr({
			"width": width,
			"height": height
		});

		outerWrapper.find(".widget-canvas")
			.append(imageCanvas);

		var ctx = imageCanvas[0].getContext("2d");
		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = lineWidth;

		/* Delete this */
		ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
		ctx.fillRect (0,0,width,height);
		
		var testInput = document.createElement("input");
		testInput.setAttribute("type", "range");

		var widgetImages = outerWrapper.select(".widget-images");
		
		/*	Select each of the images and push a new img object into
			the allImages array with the relevant src */
		var images = widgetImages.find("img");
		var imageCount = images.length;

		/*	drawFrame() num = value of input
			redraw the canvas */
		function drawFrame (num) {
			ctx.clearRect(0,0,width,height);
			
			/* Check that num is greater than 0 so we're not multiplying width by 0 */
			if (num > 0) {
				ctx.drawImage(allImages[1], 0, 0, (width * num), height, 0, 0, (width * num), height);
				ctx.drawImage(allImages[0], (width * num), 0, (width * (1 - num)), height, (width * num), 0, (width * (1 - num)), height);
			} else {
				ctx.drawImage(allImages[0], 0, 0, width, height, 0, 0, width, height);
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
			});

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

		/*	getMousePos(canvas, evt)
			Find out where the finger or the pointer is on the canvas */
		function getMousePos(canvas, evt) {
			var rect = canvas.getBoundingClientRect();
			var x,y;
			
			if (touchSupported) {
				x = evt.originalEvent.targetTouches[0].clientX;
				y = evt.originalEvent.targetTouches[0].clientY;
			} else {
				x = evt.clientX;
				y = evt.clientY;
			}
			
			return {
				x: x - rect.left,
				y: y - rect.top
			};
		}

		/* Listen for click 'n drag or swiping on the canvas */
		imageCanvas.bind(moveEvent, function (evt) {
			
			var mousePos = getMousePos(this, evt);
			var message = mousePos.x / width;
			
			if (mouseDown) {
				drawFrame(message);
				rangeInput.prop("value", message);
			}
			
		});

		/*	resize()
			Redraw and resize the canvas */
		function resize () {
			if($(window).width() != windowWidth){
				
				windowWidth = $(window).width();
				width = $("#content").width() * 0.9;
				height = Math.floor(width * heightRatio);

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

		function checkImagesLoaded() {
			imageCount--;
			console.log("imageCount is " + imageCount + " images loaded");
			
			if (imageCount === 0) {
				drawFrame(startingValue);
			}
		}

		// /* Fill the canvas image with frame 0 as soon as it is ready */
		// allImages[0].onload = checkImagesLoaded();
		// allImages[1].onload = checkImagesLoaded();

		$.each(images, function (key, value) {

			var thisImage = new Image();
			thisImage.src = this.src;
			allImages.push(thisImage);
			
			$(this).error(function(evt) {
				console.log("We have an error!");
			}).load(checkImagesLoaded());
		});

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
			// if (jQuery(".widget-images").css("display") !== "none") {
			// 	jQuery(".widget-images").css("display","none");
			// }
			init(jQuery);
		} else {
			setTimeout(arguments.callee, 60);
		}
	}, 60);

})();