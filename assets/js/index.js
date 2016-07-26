/*	Self executing anonymous function to call init()
	once jQuery is loaded */
(function() {
	var init = function($) {

		/* Dummy element to test if input[type="range"] is supported */
		var testInput = document.createElement("input");
		testInput.setAttribute("type", "range");

		/* Dummy element to test if canvas is supported */
		var testCanvas = document.createElement("canvas").getContext;

		var params1 = buildParams();
		var params2 = buildParams();

		var slider1 = new BuildWidget("#slider-1", params1);
		var slider2 = new BuildWidget("#slider-2", params2);

		/*	Check if input[type="range"] and canvas is supported
			otherwise call the whole thing off */
		if (testInput.type !== "text" && testCanvas) {
			slider1.buildCanvas();
			slider2.buildCanvas();

			slider1.loadImages();
			slider2.loadImages();

			slider1.makeRange();
			slider2.makeRange();
		} else {
			slider1.destroy();
			slider2.destroy();
		}

		window.onresize = function () {
			slider1.resizeCanvas();
			slider2.resizeCanvas();
		};
	};

	/*	Before calling init()
		- check jQuery is loaded */
	setTimeout(function() {
		if (typeof jQuery !== 'undefined') {

			init(jQuery);
		} else {
			setTimeout(arguments.callee, 60);
		}
	}, 60);

})();