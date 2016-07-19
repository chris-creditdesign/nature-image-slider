/*	getMousePos(canvas, evt)
	Find out where the finger or the pointer is on the canvas */
BuildWidget.prototype.getMousePos = function(evt) {
	var rect = this.imageCanvas[0].getBoundingClientRect();
	var x,y;
	
	if (this.params.touchSupported) {
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
};
