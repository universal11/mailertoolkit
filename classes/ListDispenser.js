function ListDispenser(){

}

ListDispenser.writeLists = function(inputData, inputPath, outputData, outputPath, outputDirectory){
	var FileSystem = require("fs");

	var outputPathExists = FileSystem.existsSync(outputDirectory);
	if(!outputPathExists){
		FileSystem.mkdirSync(outputDirectory);

	}

	FileSystem.writeFile(outputPath, outputData, function(error){
		//console.log(outputPath + " written.");
	});

	FileSystem.writeFile(inputPath, inputData, function(error){
		//console.log(inputPath + " updated.");
	});
}

ListDispenser.isValidLine = function(line){
	line = line.trim();
	if(line && line != "" && line != null && line != undefined && line.length > 0 && line != "\r"){
		return true;
	}
	return false;
}

ListDispenser.dispenseHandler = function(data, remaining){
	var dataLines = data.toString().split("\n");
	var numberOfDataLines = dataLines.length;
	var dispenserLines = new Array();
	for(var j=0; j < numberOfDataLines; j++){
		var dataLine = dataLines[j];
		if(remaining > 0){
			if(ListDispenser.isValidLine(dataLine)){
				dispenserLines.push(dataLine);
				delete dataLines[j];
				remaining--;
			}
		}
	}
	dataLines = dataLines.filter(function(result){
		return (result !== undefined && result != null);
	});
	return {
		dataLines:dataLines,
		dispenserLines:dispenserLines,
		remaining:remaining
	};
}


ListDispenser.listHandler = function(inputPath, outputPath, file, remaining){
	//console.log("Reading: " + file);
	var FileSystem = require("fs");
	var data = FileSystem.readFileSync(inputPath + "/" + file);
	if(data){
		var result = ListDispenser.dispenseHandler(data, remaining);
		if(result.dispenserLines.length > 0){
			ListDispenser.writeLists(result.dataLines.join("\n"), inputPath + "/" + file, result.dispenserLines.join("\n"), outputPath + "/" + file, outputPath);
		}
		remaining = result.remaining;	
	}
	return remaining;
}

ListDispenser.dispense = function(inputPath, outputPath, count){
	//var lists = ListDispenser.getLists(inputPath);
	var startCount = count;
	console.log("Dispensing from: " + inputPath);
	var FileSystem = require("fs");
	FileSystem.readdir(inputPath, function(error, files){
		console.log("Lists: " + files);
		var numberOfFiles = files.length;

		/*
		var outputPathExists = FileSystem.existsSync(outputPath);
		if(!outputPathExists){
			FileSystem.mkdirSync(outputPath);
		}
		*/

		for(var i=0; i < numberOfFiles; i++){
			var file = files[i];
			count = ListDispenser.listHandler(inputPath, outputPath, file, count);
		}
		if(startCount == count){
			console.log("Pool Empty!");
		}
		console.log("Created: " + outputPath);
	});
}


module.exports = ListDispenser;