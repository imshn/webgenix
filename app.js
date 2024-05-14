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

  // Create email content
  const mailOptions = {
    from: "thewebgenix@gmail.com",
    to: "shahnawaz28april@gmail.com", // Your email address where you want to receive contact form submissions
    subject: "New Contact Form Submission",
    html: `<p><b>Name:</b></p> ${name} <br> 
                <p><b>Email:</b></p> ${email} <br> 
                <p><b>Phone:</b></p> ${phone} <br> 
                <p><b>Message:</b></p> ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
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
