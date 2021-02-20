const express = require("express");
const router = express.Router();
const users = require("../controllers/user.contoller")
const Service = require("../controllers/service.controller.js")

router.get("/", (req, res) => {
})

router.post("/getToken", Service.getToken);

router.post("/register", users.register);

router.post("/verifyemail", users.verifyEmail);

router.post("/login", users.connect);

router.post("/checklogin", users.checkLogin);

router.get("/getuserslist", users.getUsersList);

router.post("/deleteUser", users.deleteUser);

router.post("/removeRight", users.removeRights);

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found"
    });
});

module.exports = router;