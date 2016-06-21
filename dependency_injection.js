'use strict';
function openFile(){
    const txtFile = "E:\NodeJS_Projects\PractiseJS_June2016\libs.txt"
    var file = new File.OpenText(txtFile);
    return file;
}
function readFile(file)
{
    //return file.readAsText();
}

function main()
{
   // readTextFile("file://E:/NodeJS_Projects/PractiseJS_June2016/libs.txt")
    var fr = new FileReader();
}

main();

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
            }
        }
    }
    rawFile.send(null);
}