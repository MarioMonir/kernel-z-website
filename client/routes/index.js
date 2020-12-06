var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const fetch = require("node-fetch");

const url = "https://aluwalls.com:8080";

router.get("/", async (req, res, next) => {
  var home = {};
  var projects = {};

  var arr = [];
  try {
    let promiseArray = [];
    let data = {};

    let home = await fetch(url + "/homes");
    home = await home.json();
    home = home[0];
    home.url = url;

    let projects = await fetch(url + "/projects?showHome=true");
    projects = await projects.json();
    projects.url = url;

    let services = await fetch(url + "/services");
    services = await services.json();
    services.url = url;

    let employers = await fetch(url + "/employers");
    employers = await employers.json();
    employers.url = url;

    let clients = await fetch(url + "/clients");
    clients = await clients.json();
    clients.url = url;

    // res.send({ employers: { ...employers } });

    res.render("index", {
      el: {
        ...home,
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

  //   res.render("index", { el: json[0] });
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
