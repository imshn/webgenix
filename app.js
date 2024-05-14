const express = require("express");
const path = require("path");
const app = express();
const nodemailer = require("nodemailer");

const port = 3000;

app.use(express.static(path.join(__dirname, "src")));
app.use(express.urlencoded({ extended: true }));
// Define routes

var transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "c48867b311c6ac3aa616f43993ece777"
  }
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "src") });
});

app.get("/service", (req, res) => {
  res.sendFile("service-details.html", { root: path.join(__dirname, "src") });
});

app.get("/about", (req, res) => {
  res.sendFile("about.html", { root: path.join(__dirname, "src") });
});

app.get("/contact", (req, res) => {
  res.sendFile("contact.html", { root: path.join(__dirname, "src") });
});

app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;
  const html = `
    <!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
  </head>
  <body style="font-family: sans-serif;">
    <div style="display: block; margin: auto; max-width: 600px;" class="main">
    // <img alt="Inspect with Tabs" src="${path.join(__dirname, "src")}/assets/images/logo/Untitled_design-removebg-preview.png" style="width: 100%;">
      <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Name</h1>
      <p>${name}</p>
      <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Email</h1>
      <p>${email}</p>
      <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Phone</h1>
      <p>${phone}</p>
      <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Message</h1>
      <p>${message}</p>
    </div>
    <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
    <style>
      .main { background-color: white; }
      a:hover { border-left-width: 1em; min-height: 2em; }
    </style>
  </body>
</html>`;
  // Create email content
  const mailOptions = {
    from: "thewebgenix@webgenix.co.in",
    to: "thewebgenix@gmail.com", // Your email address where you want to receive contact form submissions
    subject: `Email from ${name}`,
    html: html
  };

  // Send email
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending message");
    } else {
      console.log("Email sent: " + info.response);
      res.send(
        "We have received your message and will respond shortly. Thank you for reaching out to us!"
      );
    }
  });
});

app.get("/blogs", (req, res) => {
  res.sendFile("blogs.html", { root: path.join(__dirname, "src") });
});

app.get("/*", (req, res) => {
  // res.redirect("/")

  res.sendFile("/", { root: path.join(__dirname, "src") });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
