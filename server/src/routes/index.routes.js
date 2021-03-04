const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200);
    res.json({
        message: "Hello World !"
    });
})

router.get("/about.json", (req, res) => {
    
})

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found"
    });
});

module.exports = router;