let core=require('@actions/core');

var pas="pass";
var testinput=core.getInput('param1',{required:true});

core.info("This is a test input: " +  testinput);
core.setOutput("testoutput","testoutput");

