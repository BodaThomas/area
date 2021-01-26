const express = require("express");
const router = express.Router();
const users = require("../controllers/user.contoller")


router.get("/", (req, res) => {
})

router.post("/register", users.register);

router.post("/login", users.connect);

router.post("/login-admin", users.connectAdmin);

// router.post("/validate", users.validate);

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found"
    });
});

module.exports = router;