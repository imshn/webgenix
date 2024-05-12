const express = require('express');
const path = require("path")
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
// Define routes

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
