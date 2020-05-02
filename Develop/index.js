const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [
	{
		message:"What is your badge version? ",
		name: "badge",
		type:"input"
	},
	{
		message:"What is the project title? ",
		name: "project",
		type:"input"
	},
	{
		message:"What is your project description? ",
		name: "description",
		type:"input"
	},
	{
		message:"What are the table of contents? ",
		name: "table",
		type:"input"
	},
	{
		message:"What is the installation? ",
		name: "install",
		type:"input"
	},
	{
		message:"What is the usage? ",
		name: "usage",
		type:"input"
	},
	{
		message:"What is the license number? ",
		name: "license",
		type:"input"
	},
	{
		message:"Who is contributing? ",
		name: "contribute",
		type:"input"
	},
	{
		message:"What are the required tests? ",
		name: "test",
		type:"input"
	},
	{
		message:"Additional questions? ",
		name: "questions",
		type:"input"
	},
];

inquirer
	.prompt({
			message: "Enter your GitHub username:",
			name: "username",
			type:"input",
	})
	.then(function ({ username }) {
		const queryUrl = `https://api.github.com/users/${username}`
		
		inquirer.prompt(questions)
			
	.then(function(answers){
		// console.log(answers);

		let userQs = 
		// Prompt second set of questions
		`## Second Set of Questions  \n`

		let body2 =

		// Badge
		`![bage image](https://img.shields.io/static/v1?label=Version&message=${answers.badge}&color=<COLOR>) \n \n` +

		// Project Title
		`### Project title: ` +
		
		`${answers.project} \n \n` +

		// Project Description
		`Project description: ${answers.description} \n \n` +

		// Table of contents
		`Table of contents: ${answers.table} \n \n` +

		// Installation
		`Installation: ${answers.install} \n \n` +

		// Usage
		`Usage: ${answers.usage} \n \n` +

		// License
		`License: ${answers.license} \n \n` +

		// Contributing
		`Contribute: ${answers.contribute} \n \n` +

		// Tests
		`Tests: ${answers.test} \n \n` 

		var document = userQs.concat('\n', body2);
		fs.writeFile("README.md", document, function (err) {
			if (err) {
				throw err;
			}
		});

		axios.get(queryUrl).then(function (res) {
			// console.log(res.data);

			let document = 
			`# Good README Generator \n \n` + 

			// Avatar
			`![Avatar](${res.data.avatar_url}) \n \n` +

			// Usermame
			`# Username: ${res.data.login} \n \n` +

			// Email
			`Your email is: ${res.data.email} \n \n`;

			fs.appendFile("README.md", document, function (err) {
				if (err) {
					throw err;
				}
			});
		})
	})

	.catch(function(err) {
		console.log(err);
	});

})

			// function writeToFile(fileName, data) {

			// }

			// function init() {

			// }

			// init();
