const express = require("express");
const router = express.Router();
const users = require("../controllers/user.contoller")


router.get("/", (req, res) => {
    res.json("Hello World !");
})

router.get("/login", (req, res) => {
    res.json("LOGIN");
})

router.post("/register", users.create);

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found"
    });
});



module.exports = router;