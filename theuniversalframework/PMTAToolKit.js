function PMTAToolKit(){

}

PMTAToolKit.prototype.readConfig = function(config){
	console.log("hello world!");
}

PMTAToolKit.prototype.configToXml = function(data){
	data.replace("<virtual-mta ", "<virtual-mta>", "gi");
}


module.exports = PMTAToolKit;