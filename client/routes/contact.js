var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const config = require("../data/config.js");
const { url, fetchHome } = config;

router.get("/", async (req, res, next) => {
	try {
		let lang = req.app.get("lang");
		let home = await fetchHome();
		res.render("contact", {
			el: {
				...home,
				lang: lang,
				page: "contact",
			},
		});
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

module.exports = router;
