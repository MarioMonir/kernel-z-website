var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const config = require("../data/config.js");
const { url, fetchHome, fetchEntity } = config;

router.get("/", async (req, res, next) => {
	try {
		let lang = req.app.get("lang");
		let home = await fetchHome();
		let projects = await fetchEntity("projects");
		let services = await fetchEntity("services");
		let clients = await fetchEntity("clients");
		res.render("services", {
			el: {
				...home,
				lang: lang,
				page: "services",
				projects: [...projects],
				services: [...services],
				clients: [...clients],
			},
		});
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});
module.exports = router;
