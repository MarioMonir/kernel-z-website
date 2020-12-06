var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const url = "https://aluwalls.com:8080";

router.get("/", async (req, res, next) => {
	let home = await fetch(url + "/homes");
	home = await home.json();
	home = home[0];
	home.url = url;
	res.render("contact", { el: { ...home } });
});

module.exports = router;
