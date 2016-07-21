/*	Constructor to create an object for each slider */
function BuildWidget(target, params) {
	this.target = target;
	this.params = params;

	this.outerWrapper = jQuery(target);
	this.imageCanvas = jQuery("<canvas></canvas>");
	this.rangeInput = jQuery("<input />");
	this.ctx = null;
}
