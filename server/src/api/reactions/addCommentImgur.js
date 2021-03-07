const { default: axios } = require("axios");
const db = require("../../models");
const Reaction = db.reactions
const Tokens = db.tokens

const nameReaction = "Add comment Imgur"
const serviceId = 1

async function create() {
    obj = await Reaction.findOne({ where: {name: nameReaction}})
    const reaction = {
        name: nameReaction,
        serviceId: serviceId,
        description: "Add a comment to your last post on Imgur",
        params: "Commentary"
    };
    if (!obj) {
        await Reaction.create(reaction);
    }else {
        if (obj.name != reaction.name) {
            obj.name = reaction.name;
        }
        if (obj.serviceId != reaction.serviceId) {
            obj.serviceId = reaction.serviceId;
        }
        if (obj.description != reaction.description) {
            obj.description = reaction.description;
        }
        if (obj.params != reaction.params) {
            obj.params = reaction.params;
        }
        await obj.save();
    }
}
module.exports.create = create;

async function run(element) {
    const tmp = await Tokens.findOne({ where : { userId: element.userId, serviceId: serviceId }});
    const token = tmp.accessToken;
    const res = await axios.get(`https://api.imgur.com/3/account/me/submissions/newest`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error.message)
    });
    let imageId = res.data.data[0].id;
    if (imageId) {
        const data = {
            image_id: imageId,
            comment: element.paramsReaction
        };
        await axios.post(`https://api.imgur.com/3/comment`, data,
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
    }
}
module.exports.run = run;