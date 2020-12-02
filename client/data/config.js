const fetch = require("node-fetch");

const url = "http://localhost:1337";

const config = {
	url: url,
	fetchHome: async () => {
		let home = await fetch(url + "/homes");
		home = await home.json();
		home = home[0];
		home.url = url;
		return home;
	},
	fetchEntity: async (entity) => {
		let response = await fetch(url + "/" + entity);
		response = await response.json();
		response.url = url;
		return response;
	},
};

module.exports = config;
