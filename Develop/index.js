const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

// Array of questions to prompt
const questions = [
	{
		message:"What is the project title?",
		name: "project",
		type:"input"
	},
	{
		message:"What is your project description?",
		name: "description",
		type:"input"
	},
	{
		message:"What are the table of contents?",
		name: "table",
		type:"input"
	},
	{
		message:"What are the steps required to install your project?",
		name: "install",
		type:"input"
	},
	{
		message:"Provide instructions and examples for use.",
		name: "usage",
		type:"input"
	},
	{
		message:"Add a license",
		name: "license",
		type:"input"
	},
	{
		message:"Who are the contributors?",
		name: "contribute",
		type:"input"
	},
	{
		message:"Provide any tests for your application",
		name: "test",
		type:"input"
	},
	{
		message:"Provide additional questions to be answered for project",
		name: "questions",
		type:"input"
	},
	{
		message:"What version is this project?",
		name: "badge",
		type:"number"
	},
];

inquirer
	// Prompt to get Github username
	.prompt({
		message: "Enter your GitHub username:",
		name: "username",
		type:"input",
	})
	.then(function ({ username }) {
		// QueryUrl
		const queryUrl = `https://api.github.com/users/${username}`

		// Prompt questions
		inquirer.prompt(questions)
			
	.then(function(answers){
		let document =
		// Project Title
		`# ${answers.project} \n \n` +

		// Project Description
		`## Description: \n \n ${answers.description} \n \n` +

		// Table of contents
		`## Table of contents (Optional): \n \n ${answers.table} \n \n` +

		// Installation
		`## Installation: \n \n ${answers.install} \n \n` +

		// Usage
		`## Usage: \n \n ${answers.usage} \n \n` +

		// License
		`## License: \n \n ${answers.license} \n \n` +

		// Badge
		`## Badge: \n \n ![bage image](https://img.shields.io/static/v1?label=Version&message=${answers.badge}&color=<COLOR>) \n \n` +

		// Contributing
		`## Contributing: \n \n ${answers.contribute} \n \n` +

		// Tests
		`## Tests: \n \n ${answers.test} \n \n` +

		// Questions
		`## Questions: \n \n ${answers.questions} \n \n`;

		fs.writeFile("README.md", document, function (err) {
			if (err) {
				throw err;
			}
		});

		axios.get(queryUrl).then(function (res) {

			let userInfo = 
			`# User Info \n \n` + 

			// Avatar
			`![Avatar](${res.data.avatar_url}) \n \n` +

			// Usermame
			`## Username: \n \n ${res.data.login} \n \n` +

			// Email
			`## Email: \n \n ${res.data.email} \n \n`;

			fs.appendFile("README.md", userInfo, function (err) {
				if (err) {
					throw err;
				}
			});
		});
	})
	.catch(function(err) {
		console.log(err);
	});
})
