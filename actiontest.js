const path = require("path/posix");

let file=require("fs");
console.log(file.readdirSync("../../devopsporject/devopsporject"));
console.log(file.readdirSync("../../_temp"));
let github=require("@actions/github");
console.log(github.context.repo);
let reponame= github.context.repo.repo
let crypto=require("crypto");

let testfile=file.readFileSync("../../"+ reponame+"/"+ reponame+"/"+"folderlist.json","utf-8");
let json=JSON.parse(testfile);
//console.log(testfile.buffer.toString());
//console.log(testfile.)
//let json=require("../../"+ reponame+"/"+ reponame+"/"+"folderlist.json");

console.log(json.artifacts);
var provenance={
    "_type": "https://in-toto.io/Statement/v1",
    "subject": []
}



function getFileHash(filepath){
    var readfile=file.readFileSync(filepath);
    var sha256=crypto.createHash("sha256");
    sha256.update(readfile);
    var hex=sha256.digest("hex");
    //console.log(hex);
    return hex;



}

function getDirContent(f){
       
       files=file.readdirSync(f);
       for (i of files){
             //console.log("Files: " + path.join(f,i));
             var filePath=path.join(f,i);
            var sha256=getFileHash(filePath);
            console.log(sha256);
            provenance.subject.push({
               "name": filePath,
               "digest": {
                  "sha256":sha256
               }
           

            })

       }    

}

for (i of json.artifacts){

   //console.log("Directory: "+i);
   getDirContent(i);
   

}



console.log(JSON.stringify(provenance));
//file.mkdirSync("../../"+reponame+"/"+reponame+"/"+provenance+"_"+github.context.actor);

//var provenance_write=file.writeFileSync("../../"+reponame+"/"+reponame+"/"+provenance+"_"+github.context.actor+"/"+"provenance"+"_"+github.context.actor+".json",JSON.stringify(provenance));

var provenance_write=file.writeFileSync("../../"+reponame+"/"+reponame+"/"+provenance+"_"+github.context.actor+".json",JSON.stringify(provenance));



