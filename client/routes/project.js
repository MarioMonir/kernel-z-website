var express = require("express");
var router = express.Router();

const projects = require("../data/projects");

router.get("/:id", (req, res, next) => {
	console.log("i am trying to render the project again");
	console.log(projects[req.params.id]);
	res.render("project", { p: projects[req.params.id] });
});

module.exports = router;
