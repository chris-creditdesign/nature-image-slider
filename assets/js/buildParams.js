function buildParams() {
	var params = {};

	/* Array to store the images */
	params.allImages = [];

	/* Store with window Width to stop iOS resizing on scroll */
	params.windowWidth = jQuery(window).width();
	
	params.range = null;
	params.select = null;
	params.startingValue = 0.5;
	params.value = 0.5;
	params.heightRatio = 0.6667;
	params.strokeStyle = "#ffffff";
	params.lineWidth = 2;

	params.width = $("#content").width() * 0.9;
	params.height = Math.floor(params.width * params.heightRatio);

	params.touchSupported = 'ontouchstart' in window;
	params.startEvent = params.touchSupported ? 'touchstart' : 'mousedown';
	params.moveEvent = params.touchSupported ? 'touchmove' : 'mousemove';
	params.endEvent = params.touchSupported ? 'touchend' : 'mouseup';
	params.mouseDown = false;


	return params;
}
