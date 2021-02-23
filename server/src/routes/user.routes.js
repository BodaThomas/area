var router = require('express').Router();
const users = require("../controllers/user.contoller");

router.post("/register", users.register);

router.post("/verifyemail", users.verifyEmail);

router.post("/login", users.connect);

router.post("/checklogin", users.checkLogin);

router.get("/getuserslist", users.getUsersList);

router.post("/deleteUser", users.deleteUser);

router.post("/removeRight", users.removeRights);

router.post("/addRight", users.addRights);

module.exports = router;