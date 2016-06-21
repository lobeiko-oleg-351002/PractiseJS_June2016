"use strict";

function File(name) {
    this.name = name;
    this.innerFiles = [];
}

function getFilesFromInput(inputStrings)
{
    var complexFiles = [];
    for (var i = 0; i < inputStrings.length; i++) {
        var str = inputStrings[i].replace(/\s*/g,"");
        var fileAndInners = str.split(':');
        var newComplexFile = new File(fileAndInners[0]);
        var innerFiles = fileAndInners[1].toString().split(',');
        for (var j = 0; j < innerFiles.length; j++) {
            newComplexFile.innerFiles.push(new File(innerFiles[j]));
        }
        complexFiles.push(newComplexFile);
    }
    return complexFiles;
}

var sequence = [];

function getFileSequence(files) {
    for (var i = 0; i < files.length; i++) {
        checkOnComplexity(files[i],files);
    }
    return sequence;
}


function checkOnComplexity(file, files)
{
    for (var i = 0; i < files.length; i++) {
        if (file.name === files[i].name) {
            for (var j = 0; j < files[i].innerFiles.length; j++) {
                checkOnComplexity(files[i].innerFiles[j], files);
            }   
        }
        else {

        }
    }
    if (!isFileInSequence(file)) {
        sequence.push(file);
    }
}

function isFileInSequence(file)
{
    for (var i = 0; i < sequence.length; i++) {
        if (file.name === sequence[i].name) {
            return true;
        }
    }
    return false;
}

console.log(getFileSequence(getFilesFromInput(readFile())));

function readFile() {
    var output = [];
    output.push("main: math, io, coolLib");
    output.push("math: io, superCoolLib");
    output.push("coolLib: superCoolLib");
    output.push("io:");
    output.push("superCoolLib:");
    return output;
}