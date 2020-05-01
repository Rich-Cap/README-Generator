const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
	.prompt({
		message: "Enter your GitHub username:",
		name: "username"
	})
	.then(function ({ username }) {
		const queryUrl = `https://api.github.com/users/${username}`;

		axios.get(queryUrl).then(function (res) {
			// console.log(res.data);
			console.log(res.data.avatar_url);
			console.log(res.data.email);

			const avatarURL = res.data.avatar_url;
			const avatar = '![Avatar](' + avatarURL + ')';
			// const repoName = res.data.map(function (repo) {
			// return repo.name;
			// console.log (repoName);

			fs.writeFile("README.md", avatar, function (err) {
				if (err) {
					throw err;
				}
			});

		});

	});




			// const questions = [

			// ];

			// function writeToFile(fileName, data) {
			// }

			// function init() {

			// }


			// init();
