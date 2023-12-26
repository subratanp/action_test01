let core=require('@actions/core');

<<<<<<< HEAD
var pas="pass";
=======
var pas="dfdf"
>>>>>>> 2d68aa9 (Testing Now)
var testinput=core.getInput('param1',{required:true});

core.info("This is a test input: " +  testinput);
core.setOutput("testoutput","testoutput");

