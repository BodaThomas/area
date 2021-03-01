const { exit } = require("process");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const Area = db.area

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
    await sendMail(user);
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
        await exist.save();
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

// Login
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
            data.accessToken = await genToken();
            await data.save();
            res.status(200).json({
                username: data.username,
                email: data.email,
                is_admin: data.isAdmin,
                accessToken: data.accessToken,
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

exports.checkLogin = async (req, res) => {
    if (!req.body.accessToken) {
        res.status(400).json({
            message: "Access token missing !",
            success: false
        }).send();
        return;
    }

    var data = await User.findOne({ where: {accessToken: req.body.accessToken}});

    if (data) {
        res.status(200).json({
            success: true
        }).send();
    } else {
        res.status(503).json({
            message:  "Invalid login token !",
            success: false
        }).send();
    }
};

const sendMail = async function (user) {
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
    await request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
}

// Admin
exports.getUsersList = async (req, res) => {
    const data = await User.findAll({ where :{ isValid: true }});
    if (data) {
        res.status(200).json({
            data,
            success: true
        }).send();
    } else {
        res.status(503).json({
            message: "Error to get data !",
            success: false
        }).send();
    }
};

exports.addRights = async (req, res) => {
    if (!req.body.username) {
        res.status(400).json({
            message: "Username missing !",
            success: false
        }).send();
        return;
    }

    const data = await User.findOne({ where: { username: req.body.username }});
    if (!data) {
        res.status(503).json({
            message: "User not found !",
            success: false
        }).send();
    } else {
        data.isAdmin = true;
        await data.save();
        res.status(200).json({
            success: true
        }).send();
    }
};

exports.removeRights = async (req, res) => {
    if (!req.body.username) {
        res.status(400).json({
            message: "Username missing !",
            success: false
        }).send();
        return;
    }

    const data = await User.findOne({ where: { username: req.body.username }});
    if (!data) {
        res.status(503).json({
            message: "User not found !",
            success: false
        }).send();
    } else {
        data.isAdmin = false;
        await data.save();
        res.status(200).json({
            success: true
        }).send();
    }
};

exports.deleteUser = async (req, res) => {
    if (!req.body.username) {
        res.status(400).json({
            message: "Username missing !",
            success: false
        }).send();
        return;
    }
    
    const data = await User.findOne({ where : { username: req.body.username }});
    if (!data) {
        res.status(503).json({
            message: "User not found !",
            success: false
        }).send();
    } else {
        await data.destroy();
        res.status(200).json({
            success: true
        }).send();
    }
};

exports.addArea = async (req, res) => {
    if (!req.headers.accesstoken) {
        res.status(504).json({
            message: "You must be connected to access this page",
            success: false
        }).send()
        return;
    }
    const user = await User.findOne({where : { accessToken: req.headers.accesstoken }})
    if (!user) {
        res.status(504).json({
            message: "Wrong accessToken",
            success: false
        })
    }
    if (!req.body.actionId || !req.body.reactionId) {
        res.status(504).json({
            message: "Action or Reaction not given.",
            success: false
        }).send()
        return;
    }
    const area = {
        userId: user.id,
        actionId: req.body.actionId,
        reactionId:  req.body.reactionId,
        paramsAction: req.body.actionParams,
        paramsReaction: req.body.reactionParams,
        lastResult: ""
    }
    await Area.create(area);
    res.status(201).json({
        success: true
    }).send()
};