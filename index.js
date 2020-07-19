const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");



const writeFileAsync = util.promisify(fs.writeFile);

function writeToFile() {
    return inquirer.prompt([ 
      {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
      },
      {
        type: "input",
        name: "description",
        message: "Please provide a brief description of your application"
      },
      {
        type: "input",
        name: "installation",
        message: "What are the steps required to install your project?"
      },
      {
        type: "input",
        name: "usage",
        message: "how do you use this application?"
      },
      {
        type: "input",
        name: "credits",
        message: "please list all of the collaborators"
      },
      {
        type: "input",
        name: "contribution",
        message: "provide a brief description of how others can contribute if they would like to"
      },
      {
        type: "checkbox",
        name: "licenses",
        message: "please select the licenses that this application has",
        choices: ["MIT", "CC BY"]
      }]);
}
function generateReadMe (answers) {
    return ` # ${answers.title}
            ## ${answers.description}
            ## ${answers.installation}
            ## ${answers.usage}
            ## ${answers.credits}
            ## ${answers.contribution}
            ## ${answers.licenses}    
    `
}

async function init() {
    try {
      const answers = await writeToFile();
      const markDown = generateReadMe(answers);
      await writeFileAsync("readMe.md", markDown);
      console.log("Successfully created the readMe.md");
    } catch(err) {
      console.log(err);
    }
}


init();