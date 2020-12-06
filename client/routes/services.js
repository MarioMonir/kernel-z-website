var express = require("express");
var router = express.Router();
const url = "https://aluwalls.com:8080";
const fetch = require("node-fetch");

router.get("/", async (req, res, next) => {
	let services = await fetch(url + "/services");
	services = await services.json();
	services.url = url;

	let home = await fetch(url + "/homes");
	home = await home.json();
	home = home[0];
	home.url = url;

	let clients = await fetch(url + "/clients");
	clients = await clients.json();
	clients.url = url;
	console.log("hello clients");
	console.log(clients);
	res.render("services", {
		el: { ...home, services: [...services], clients: [...clients] },
	});
});
module.exports = router;
