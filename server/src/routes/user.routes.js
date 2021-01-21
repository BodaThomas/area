const express = require("express");
const router = express.Router();
const users = require("../controllers/user.contoller")


router.get("/", (req, res) => {
})

router.post("/register", users.create);

router.post("/login", users.findbyId);

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found"
    });
});

module.exports = router;