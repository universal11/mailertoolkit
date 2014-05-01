function HTMLToolKit(){

}

HTMLToolKit.prototype.htmlToImage = function(htmlFile, outputFile, width, height){
	if(width === undefined){ width = 1024; }
	if(height === undefined){ height = 1024; }

	var System = require("sys");
	var ImageRenderProcess = require("child_process").exec;

	ImageRenderProcess("./wkhtmltoimage" + " --width " + width + " --height " + height + " " + htmlFile + " " + outputFile);
}

module.exports = HTMLToolKit;