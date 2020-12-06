var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const url = "https://aluwalls.com:8080";

router.get("/", async (req, res, next) => {
	let home = await fetch(url + "/homes");
	home = await home.json();
	home = home[0];
	home.url = url;

	let employers = await fetch(url + "/employers");
	employers = await employers.json();
	employers.url = url;

	res.render("about", { el: { ...home, employers: [...employers] } });
});

module.exports = router;
