const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("CareerForge Backend Running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});