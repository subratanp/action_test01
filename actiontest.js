const path = require("path/posix");
let core=require("@actions/core");
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
    "subject": [],
    "perdicateType":"https://slsa.dev/provenance/v1",
    "predicate":{
       "buildDefinition":{
       "buildType":"",
       "externalParameter":[],
       "internalParameters":{},
       "resolveDependencies":[]
    }
   },
   "runDetails":{
       "builder": {
             "id":"",
             "version":{
                  "github":"",
                   "runner_name":"",
                   "runner_os":""

             },
             "builderDependencies":[],
             

       },
       "metadata":{
           
         "committ_timestamp":"",
         "invocationId":"",
         "committ_url":"",
         "commit_id":"",
         "branch":"",
         

 }

   }
   
}


var internalParameter={
      "github_committer_id":"",
      "github_committer_name":"",
      "github_committer_email":"",
      
      "repository_name":"",
      "main_workflow_name":"",
      "main_workflow_hash":"'",
      "event_name":"'"
           
      

}

var externalParameter={
     "inputs":{
       "actor_machine":"",
       "author_username":"",
       "author_email":"",
       "local_committer_name":"",
       "local_committer_email":"",
       "build_type_auth": ""
     
   }



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

var provenance_write=file.writeFileSync("../../"+reponame+"/"+reponame+"/"+"provenance"+"_"+github.context.actor_id+".json",JSON.stringify(provenance));

//core.setOutput("../../"+reponame+"/"+reponame+"/"+provenance+"_"+github.context.actor_id+".json")
//console.log("../../"+reponame+"/"+reponame+"/"+provenance+"_"+github.context.actor_id+".json")
//console.log(github.context);
//console.log(github.context.payload.commits);
//console.log(github.context.payload.head_commit.author);
//console.log(github.context.payload.head_commit.committer);

internalParameter.github_committer_id=github.context.payload.sender.id;
internalParameter.github_committer_name=github.context.payload.pusher.name
internalParameter.github_committer_email=github.context.payload.pusher.email
internalParameter.author_username=github.context.payload.head_commit.author.username
internalParameter.author_email=github.context.payload.head_commit.author.email
internalParameters.local_committer_name=github.context.payload.head_commit.committer.username
internalParameter.local_committer_email=github.context.payload.head_commit.committer.email
provenance.runDetails.metadata.commit_id=github.context.payload.head_commit.id
provenance.runDetails.metadata.url=github.context.payload.head_commit.url
provenance.runDetails.metadata.committ_timestamp=github.context.payload.head_commit.timestamp
provenance.runDetails.metadata.invocationId=github.context.runNumber;
provenance.runDetails.metadata.branch=github.context.ref

console.log(console.log(github.context))
console.log("########")

console.log(github.context.payload.sender.id)
console.log(github.context.payload.pusher.name)
console.log(github.context.payload.pusher.email)
console.log(github.context.payload.repository.url)
//console.log(github.context.payload.actor)
console.log("#####")
console.log(github.context.payload.commits)
console.log("#####")

console.log(github.context.payload.head_commit.author.username)
console.log(github.context.payload.head_commit.author.email)
console.log("#####")

console.log("######")
console.log(github.context.payload.head_commit.committer.username);
console.log(github.context.payload.head_commit.committer.email);
console.log(github.context.payload.head_commit.timestamp);
console.log(github.context.payload.head_commit.id);
console.log(github.context.payload.head_commit.url);
console.log("###")
console.log(github.action_path)
console.log(github.action_ref)



if (file.existsSync("../../"+reponame+"/"+reponame+"/"+provenance+"_"+github.context.actor_id+".json")){

  core.setOutput("File Found");
  console.log("File Found")

}
else{
   core.setOutput("Not Found");
   console.log("File Not Found")

}



