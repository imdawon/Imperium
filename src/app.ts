import express from "express";

const app = express();
const port = 2050;

app.get("/", (req, res) => {
    res.send("Hit the home page, homie :)");
});

app.listen(port, err => {
    if (err) {
        console.error(err);
    }
    console.log(`Listening @ http://localhost:${port} 🚪`)
})