var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const config = require("../data/config.js");
const { url, fetchHome, fetchEntity } = config;

router.get("/", async (req, res, next) => {
	try {
		let lang = req.app.get("lang");
		let home = await fetchHome();
		let employers = await fetchEntity("employers");
		res.render("about", {
			el: {
				...home,
				lang: lang,
				page: "about",
				employers: [...employers],
			},
		});
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

module.exports = router;
