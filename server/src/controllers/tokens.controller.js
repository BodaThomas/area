const { exit } = require("process");
const axios = require('axios');
const db = require("../models");
const Tokens = db.tokens;
const User = db.user;
const Service = db.services;
const Op = db.Sequelize.Op;

const clientIDGihtub = '90d45db59b92aa76bd6d'
const clientSecretGithub = '141699e06b7646b06d398eac7ac5efc621f3453a'

const clientIDLinkedin = '77wl8zl7gsmo2y'
const clientSecretLinkedin = 'XC4WS4vkwkjvcSAX'

const clientIDGmail = '1075659410846-p4qihf6j87volbo54bsam5frqemvem1r.apps.googleusercontent.com'
const clientSecretGmail = 'bIAdsSfkQ4KFTFJLo7hvHwRz'

const getGithubCode = async function (codeQuery) {
    const body = {
        clientId = clientIDGihtub,
        clientSecret = clientSecretGithub,
        code = codeQuery
    };

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${body.clientId}&client_secret=${body.clientSecret}&code=${body.code}`,
        headers: {
             accept: 'application/json'
        }
    }).then((response) => {
        const accessToken = response.data.access_token;
        return accessToken;
    });
}

const getLinkedinCode = async function (codeQuery) {
    const body = {
        clientId = clientIDLinkedin,
        clientSecret = clientSecretLinkedin,
        code = codeQuery
    };

    axios({
        method: 'post',
        url: `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=${body.clientId}&client_secret=${body.clientSecret}&code=${body.code}&redirect_uri=http://localhost:8081/app/ouath/linkedin`,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        const accessToken = response.access_token;
        return accessToken;
    });
}

const getGmailCode = async function (codeQuery) {
    const body = {
        clientId = clientIDGmail,
        clientSecret = clientSecretGmail,
        code = codeQuery
    };

    axios({
        method: 'post',
        url: `https://accounts.google.com/o/oauth2/token?code=${body.code}&client_id=${body.clientId}&client_secret=${body.clientSecret}&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fapp%2Foauth%2Fgmail&grant_type=authorization_code`,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        const accessToken = response.access_token;
        return accessToken;
    });
}

exports.addToken = async (req, res) => {
    if (!req.body.userAccessToken || !req.body.serviceName || !req.body.accessToken || !req.body.refreshToken) {
        res.status(400).json({
            message: "Content can't be empty.",
            success: false
        }).send();
        return;
    }

    var access_token;
    if (req.body.serviceName === "github") {
        access_token = getGithubCode(req.query.code);
    } else if (req.body.serviceName === "linkedin") {
        access_token = getLinkedinCode(req.query.code);
    } else if (req.body.serviceName === "gmail") {
        access_token = getGmailCode(req.query.code);
    } else {
        access_token = req.body.accessToken;
    }

    var userId = await User.findOne({ where: { accessToken: req.body.userAccessToken}});
    var serviceId = await Service.findOne({ where: { name: req.body.serviceName}});

    const token = {
        userId: userId,
        serviceId : serviceId,
        accessToken: access_token,
        refreshToken: req.body.refreshToken
    }

    await Tokens.create(token)
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the token.",
            success: false
        }).send();
    });
    res.status(200).json({
        success: true
    }).send();
};

exports.getGithubCode = async (req, res) => {
    const body = {
        client_id: clientID,
        client_secret: clientSecret,
        code: req.query.code
    };

    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${body.client_id}&client_secret=${body.client_secret}&code=${body.code}`,
        headers: {
             accept: 'application/json'
        }
    }).then((response) => {
        const accessToken = response.data.access_token;
        
        res.status(200).json({
            success: true
        });
    }).catch(err => res.status(500).json({
        message: err.message,
        success: false
    }));
};