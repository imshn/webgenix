const express = require('express');
const path = require("path")
const app = express();
const nodemailer = require('nodemailer');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
// Define routes


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "thewebgenix@gmail.com",
        pass: "Ineedthispassword",
    }
});


app.get('/', (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, 'public') })
});

app.get("/service", (req, res) => {
    res.sendFile("service.html", { root: path.join(__dirname, 'public') })
})

app.get("/about", (req, res) => {
    res.sendFile("about.html", { root: path.join(__dirname, 'public') })
})

app.get("/contact", (req, res) => {
    res.sendFile("contact.html", { root: path.join(__dirname, 'public') })
})


app.post('/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Create email content
    const mailOptions = {
        from: 'thewebgenix@gmail.com',
        to: 'shahnawaz28april@gmail.com', // Your email address where you want to receive contact form submissions
        subject: 'New Contact Form Submission',
        html: `<p><b>Name:</b></p> ${name} <br> 
                <p><b>Email:</b></p> ${email} <br> 
                <p><b>Phone:</b></p> ${phone} <br> 
                <p><b>Message:</b></p> ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending message');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('We have received your message and will respond shortly. Thank you for reaching out to us!');
        }
    });
});


app.get("/blogs", (req, res) => {
    res.sendFile("blogs.html", { root: path.join(__dirname, 'public') })
})

app.get("/*", (req, res) => {
    // res.redirect("/")

    res.sendFile("/", { root: path.join(__dirname, 'public') })
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
