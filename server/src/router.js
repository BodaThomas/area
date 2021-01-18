const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.json("Hello World !");
})

router.get("/login", (req, res) => {
    res.json("LOGIN");
})

router.get("/register", (req, res) => {
    res.json("REGISTER");
})

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found"
    });
});



module.exports = router;