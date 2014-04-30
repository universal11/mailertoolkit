function TemplateBuilder(){
}

TemplateBuilder.BUILD_MODE = {
	NORMAL : 1,
	IMAGE_MAP : 2,
	BITLY : 3,
	IMAGE_MAP_WITH_BITLY : 4
}

TemplateBuilder.create = function(FileSystem, JSDOM, name, htmlToolKit, templateFile, outputDirectory, buildMode){
	name = name.replace(/\s/g, "");
	//var output = "<span>test3</span>";
	var outputFile = outputDirectory + "/" + name;


	FileSystem.readFile(templateFile, "utf-8", function(error, data){
		if(error){
			console.log(error);
			throw error;
		}
		//console.log("Reading: " + data);
		var document = JSDOM(data);
		var window = document.parentWindow;

		console.log(window.document.innerHTML)
		var links = window.document.getElementsByTagName("a");
		console.log(links);

		switch(buildMode){
			case TemplateBuilder.BUILD_MODE.IMAGE_MAP:
				TemplateBuilder.imageMap(data, outputFile + ".jpg");
				break;
			default:
				break;
		}

		//
		//manipulate template here

		FileSystem.writeFile(outputFile, data, function(error){
			if(error){
				console.log(error);
				throw error;
			}
			//console.log(data);
			//console.log("Saved!");
		});

	});

	
}

TemplateBuilder.build = function(template, domain){
	/*
	' _ space.repeat(tt.number(3,12)) _ '
	*/
	//var domainFragments = domain.split("", 3);
	//var shatteredDomain = 
	//template = template.replace(new RegExp("[#domain#]", "gm"), domain);
	template = template.replace(/\[\!\#domain\#\!\]/g, domain);
	template = template.replace(/\[\!\#domain_fragments\#\!\]/g, TemplateBuilder.domainToFragments(domain));
	return template;
}

//does not support subdomains currently
TemplateBuilder.domainToFragments = function(domain){
	var domainName = domain.split(".")[0];
	var domainNameCharacters = domainName.split("");
	var domainNameCharactersCount = domainNameCharacters.length;
	var domainFragments = "'";
	for(var i=0; i < domainNameCharactersCount; i++){
		var domainNameCharacter = domainNameCharacters[i];
		domainFragments += domainNameCharacter;
		if(( (i + 1) % 3) == 0){
			if(i != (domainNameCharactersCount - 1)){
				domainFragments += "' _ space.repeat(tt.number(3,12)) _ '";
			}
			

		}
	}
	domainFragments += "'";
	return domainFragments;
}

TemplateBuilder.imageMap = function(html, outputFile){
	htmlToolKit.htmlToImage(templateFile, outputFile, 800, 0);
	//to do --- upload generated image to hosting

}

TemplateBuilder.test = function(){
	
}

TemplateBuilder.processTokenValues = function(){

}

TemplateBuilder.createWithBitly = function(){

}

TemplateBuilder.createWithImageMapAndBitly = function(){

}


module.exports = TemplateBuilder;