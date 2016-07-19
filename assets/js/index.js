(function() {
	var init = function($) {

		/* Dummy element to test if input[type="range"] is supported */
		var testInput = document.createElement("input");
		testInput.setAttribute("type", "range");

		var params = buildParams();

		var slider = new BuildWidget("#slider-1", params);

		slider.buildCanvas();
		slider.loadImages();

		/*	call makeRange() if input[type="range"] is supported
			call makeSelect() otherwise */
		if (testInput.type !== "text") {
			slider.makeRange();
		} else {
			slider.makeSelect();
		}

		window.onresize = function () {
			slider.resizeCanvas();
		};

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