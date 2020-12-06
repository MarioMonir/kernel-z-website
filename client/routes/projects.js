var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

const url = "https://aluwalls.com:8080";

router.get("/:id", async (req, res, next) => {
	console.log(req.params.id);

	try {
		let home = await fetch(url + "/homes");
		home = await home.json();
		home = home[0];
		home.url = url;

		let project = await fetch(url + "/projects/" + req.params.id);
		project = await project.json();
		project.url = url;
		//res.send(project);
		res.render("project", {
			el: { ...home, p: project },
		});
	} catch (error) {
		console.error(error);
	}
	//

	//res.render("project", { p: projects[req.params.id] });
});

router.get("/", async (req, res, next) => {
	let projects = await fetch(url + "/projects");
	projects = await projects.json();
	projects.url = url;

	let home = await fetch(url + "/homes");
	home = await home.json();
	home = home[0];
	home.url = url;

	res.render("projects", {
		el: { ...home, projects: [...projects] },
	});
});

module.exports = router;

