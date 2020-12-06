var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const config = require("../data/config.js");
const { url, fetchHome, fetchEntity } = config;

router.get("/:id", async (req, res, next) => {
	console.log(req.params.id);
	try {
		let lang = req.app.get("lang");
		let home = await fetchHome();
		let project = await fetchEntity("projects/" + req.params.id);

		res.render("project", {
			el: {
				...home,
				lang: lang,
				page: "projects",
				p: project,
			},
		});
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

router.get("/", async (req, res, next) => {
	try {
		let lang = req.app.get("lang");
		let home = await fetchHome();
		let projects = await fetchEntity("projects");
		res.render("projects", {
			el: {
				...home,
				lang: lang,
				page: "projects",
				projects: [...projects],
			},
		});
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

module.exports = router;

