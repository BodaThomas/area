const express = require("express");
const { reactions } = require("../models");
const router = express.Router();
const db = require("../models");
const Services = db.services
const Actions = db.actions
const Reactions = db.reactions

router.get("/", (req, res) => {
    res.status(200);
    res.json({
        message: "Hello World !"
    });
})

router.get("/about.json", async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    var service = [];
    const services = await Services.findAll()
    var actionsArray = []
    var reactionsArray = []
    for (const element of services) {
        const action = await Actions.findAll({where: {serviceId: element.id}})
        const reaction = await Reactions.findAll({where: {serviceId: element.id}})
        for (const elementAction of action) {
            const actionJson = {
                name: elementAction.name,
                description: elementAction.description
            }
            actionsArray.push(actionJson)
        }
        for (const elementReaction of reaction) {
            const reactionJson = {
                name: elementReaction.name,
                description: elementReaction.description
            }
            reactionsArray.push(reactionJson)
        }
        const serviceJson = {
            name: element.name,
            actions: actionsArray,
            reactions: reactionsArray
        }
        service.push(serviceJson)
        actionsArray = []
        reactionsArray = []
    }
    const json = {
        client: {
            host: ip
        },
        server: {
            current_time: Date.now(),
            services: service
        }

    }
    res.status(201).json(json).send()
})

router.use((req, res) => {
    res.status(404);
    res.json({
        error: "Page not found"
    });
});

module.exports = router;