const { exit } = require("process");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

const bcrypt = require('bcrypt');


const hashPassword = async (password, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);

        return (await bcrypt.hash(password, salt));
    } catch (err) {
        console.log(err);
    }
    return null;
}

const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (err) {
        console.log(err);
    }
    return (false);
}

const genToken = async () => {
    var rand = function() {
        return Math.random().toString(36).substr(2);
    };
    var tok = rand() + rand();
    while (exist = await User.findOne({ where: {registerToken : tok}}))
        tok = rand() + rand();
    return tok;
}

exports.register = async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).json({
            message: "Content can not be empty!",
            success: false
        }).send();
        return;
    }

    exist = await User.findOne({ where: {email: req.body.email}});
    if (exist) {
        res.status(502).json({
            message:  "Email already exist !",
            success: false
        }).send();
        return;
    }

    const user = {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        email: req.body.email,
        isAdmin: false,
        registerToken: await genToken(),
        isValid: false
    };

    await User.create(user)
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the user.",
            success: false
        }).send();
    });
    res.status(200).json({
        username: user.username,
        email: user.email,
        is_admin: user.isAdmin,
        success: true
    }).send();
    sendMail(user);
    return;
};

exports.verifyEmail = async (req, res) => {
    if (!req.body.registerToken) {
        res.status(400).json({
            message: "Content can not be empty!",
            success: false
        }).send();
        return;
    }
    exist = await User.findOne({ where: {registerToken: req.body.registerToken}});
    if (exist) {
        exist.isValid = true;
        exist.save();
        res.status(200).json({
            success: true
        }).send();
        return;
    }
    res.status(502).json({
        message:  "Wrong Token.",
        success: false
    }).send();
    return;
}

// login
exports.connect = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            message: "Content can not be empty!",
            success: false
        }).send();
        return;
    }

    var data = await User.findOne({ where: {email: req.body.email}});
    if (data) {
        const correctPassword = await comparePassword(req.body.password, data.password);
        if (correctPassword) {
            res.status(200).json({
                username: data.username,
                email: data.email,
                is_admin: data.isAdmin,
                success: true
            }).send();
        }else {
            res.status(503).json({
                message:  "Email or password is not correct !",
                success: false
            }).send();
        }
    } else {
        res.status(503).json({
            message:  "Email or password is not correct !",
            success: false
        }).send();
    }
};

// login admin
exports.connectAdmin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            message: "Content can not be empty!",
            success: false
        }).send();
        return;
    }

    var data = await User.findOne({ where: {email: req.body.email}});
    if (data) {
        const correctPassword = await comparePassword(req.body.password, data.password);
        if (data.isAdmin == false) {
            res.status(503).json({
                message: "User is not admin !",
                success: false
            }).send();
        } else if (correctPassword) {
            res.status(200).json({
                username: data.username,
                email: data.email,
                is_admin: data.isAdmin,
                success: true
            }).send();
        } else {
            res.status(503).json({
                message:  "email or password is not correct !",
                success: false
            }).send();
        }
    } else {
        res.status(503).json({
            message:  "email or password is not correct !",
            success: false
        }).send();
    }
};

const sendMail = function (user) {
    const mailjet = require ('node-mailjet')
    .connect('0cf0ce48886fd43ba8128d537134eb19', '4994fcdf1a1623664a9ea63c5022fc4b')
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
    "Messages":[
        {
        "From": {
            "Email": "area.tek.2023@gmail.com",
            "Name": "Area"
        },
        "To": [
            {
            "Email": user.email,
            "Name": user.username
            }
        ],
        "Subject": "Confirm registration.",
        "TextPart": "Confirm registration",
        "HTMLPart": "Dear " + user.username + ", Click <a href='http://localhost:8081/verifyemail?token=" + user.registerToken + "'>here</a> to confirm registration!<br />May the AREA force be with you!",
        "CustomID": "AppGettingStartedTest"
        }
    ]
    })
    request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
}