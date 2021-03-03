const { exit } = require("process");
const axios = require('axios');
const db = require("../models");
const Tokens = db.tokens;
const User = db.user;
const Service = db.services;
const Op = db.Sequelize.Op;

const clientIDGihtub = process.env.CLIENTGITHUB;
const clientSecretGithub = process.env.SECRETGITHUB;

const clientIDLinkedin = process.env.CLIENTLINKEDIN;
const clientSecretLinkedin = process.env.SECRETLINKEDIN;

const clientIDGmail = process.env.CLIENTGMAIL;
const clientSecretGmail = process.env.SECRETGMAIL;

const getGithubCode = async function (codeQuery) {
    const body = {
        clientId: clientIDGihtub,
        clientSecret: clientSecretGithub,
        code: codeQuery
    };

    const res = await axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${body.clientId}&client_secret=${body.clientSecret}&code=${body.code}`,
        headers: {
             accept: 'application/json'
        }
    }).then((response) => {
        const accessToken = response.data.access_token;
        return accessToken;
    }).catch(error => {
        console.log(error);
    });
    return res;
}

const getLinkedinCode = async function (codeQuery) {
    const body = {
        clientId: clientIDLinkedin,
        clientSecret: clientSecretLinkedin,
        code: codeQuery
    };

    const res = await axios({
        method: 'post',
        url: `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=${body.clientId}&client_secret=${body.clientSecret}&code=${body.code}&redirect_uri=http://localhost:8081/app/oauth/linkedin`,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        const accessToken = response.data.access_token;
        return accessToken;
    }).catch(error => {
        console.log(error);
    });
    return res;
}

const getGmailCode = async function (codeQuery) {
    const body = {
        clientId: clientIDGmail,
        clientSecret: clientSecretGmail,
        code: codeQuery
    };

    const res = await axios({
        method: 'post',
        url: `https://accounts.google.com/o/oauth2/token?code=${body.code}&client_id=${body.clientId}&client_secret=${body.clientSecret}&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fapp%2Foauth%2Fgmail&grant_type=authorization_code`,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        const accessToken = response.data.access_token;
        return accessToken;
    }).catch(error => {
        console.log(error);
    });
    return res;
}

exports.addToken = async (req, res) => {
    if (!req.query.accessToken || !req.body.serviceName) {
        res.status(400).json({
            message: "Content can't be empty.",
            success: false
        }).send();
        return;
    }

    var access_token;
    if (req.body.serviceName === "github") {
        access_token = await getGithubCode(req.body.code);
    } else if (req.body.serviceName === "linkedin") {
        access_token = await getLinkedinCode(req.body.code);
    } else if (req.body.serviceName === "gmail") {
        access_token = await getGmailCode(req.body.code);
    } else {
        access_token = req.body.access_token;
    }

    var userId = await User.findOne({ where: { accessToken: req.query.accessToken}});
    var serviceId = await Service.findOne({ where: { name: req.body.serviceName}});

    const token = {
        userId: userId.id,
        serviceId : serviceId.id,
        accessToken: access_token,
        refreshToken: req.body.refreshToken
    }
    const obj = await Tokens.findOne({where : { userId: token.userId, serviceId: token.serviceId }});
    if (obj) {
        obj.accessToken = token.accessToken
        await Tokens.save(obj)
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while saving the token.",
                success: false
            }).send();
        });
        res.status(200).json({
            success: true
        })
    } else {
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
    }
};