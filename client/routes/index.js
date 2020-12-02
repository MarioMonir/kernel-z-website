var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const config = require("../data/config.js");
const { url, fetchHome, fetchEntity } = config;

router.get("/", async (req, res, next) => {
  try {
    let lang = req.app.get("lang");
    let home = await fetchHome();
    let projects = await fetchEntity("projects?showHome=true");
    let services = await fetchEntity("services");
    let employers = await fetchEntity("employers");
    let clients = await fetchEntity("clients");
    res.render("index", {
      el: {
        ...home,
        lang: lang,
        page: "home",
        projects: [...projects],
        services: [...services],
        employers: [...employers],
        clients: [...clients],
      },
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

// Submit lead
router.post("/", function (req, res) {
  res.send("server recieved the request peacefully");
  console.log(req.body);

  // tested and worked well jus put a valid email and password to send by

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "", // put a valid email
      pass: "", // put a valid password
    },
  });

  var mailOptions = {
    from: req.body.email,
    to: "mazensoliman@kernel-z.com",
    subject: req.body.subject,
    text: `
          First-Name  : ${req.body.fname}
          Last-Name  : ${req.body.lname}
          Email : ${req.body.email}
          Message: 
          ${req.body.message}
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});
module.exports = router;
