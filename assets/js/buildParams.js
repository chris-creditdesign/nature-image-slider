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
	params.widthAdjustment = 0.9;
	params.heightRatio = 0.6667;
	params.strokeStyle = "#ffffff";
	params.lineWidth = 2;

	var size = getCanvasSize(params.widthAdjustment, params.heightRatio);

	params.width = size.width;
	params.height = size.height;

	params.touchSupported = 'ontouchstart' in window;
	params.startEvent = params.touchSupported ? 'touchstart' : 'mousedown';
	params.moveEvent = params.touchSupported ? 'touchmove' : 'mousemove';
	params.endEvent = params.touchSupported ? 'touchend' : 'mouseup';
	params.mouseDown = false;


	return params;
}

function getCanvasSize(widthAdjustment, heightRatio) {

	var width = Math.floor(jQuery("#content").width() * widthAdjustment);
	var height = Math.floor(width * heightRatio);

	return {
		width: width,
		height: height
	};
}