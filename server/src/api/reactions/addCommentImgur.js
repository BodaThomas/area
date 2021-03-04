const { default: axios } = require("axios");
const db = require("../../models");
const Reaction = db.reactions
const Tokens = db.tokens

const nameReaction = "Add comment Imgur"

async function create() {
    obj = await Reaction.findOne({ where: {name: nameReaction}})
    const reaction = {
        name: nameReaction,
        serviceId: 1,
        description: "Add a comment to your last post on Imgur",
        params: "comment"
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
    const token = await Tokens.findOne({ where : { userId: element.userId, serviceId: element.serviceId }}).accessToken;
    const data = new FormData();
    const res = await axios.get(`https://api.imgur.com/3/account/me/submissions/newest`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error.message)
    });
    if (imageId = res.data.data[0].id) {
        data.append('image_id', imageId);
        data.append('comment', element.paramsReaction);
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