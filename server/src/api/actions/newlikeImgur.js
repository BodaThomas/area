const { tokens, reactions } = require("../../models");
const db = require("../../models");
const axios = require("axios")
const Actions = db.actions;
const Services = db.services;
const Tokens = db.tokens;

const nameAction = "New like Imgur"

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: 1,
        description: "Check if there is a new like in our last image",
        params: ""
    };
    if (!obj) {
        await Actions.create(action);
    }else {
        if (obj.name != action.name) {
            obj.name = action.name;
        }
        if (obj.serviceId != action.serviceId) {
            obj.serviceId = action.serviceId;
        }
        if (obj.description != action.description) {
            obj.description = action.description;
        }
        if (obj.params != action.params) {
            obj.params = action.params;
        }
        await obj.save();
    }
}
module.exports.create = create;

async function run(user_id) {
    // const data = await Actions.findOne({ where: { name: nameAction}});
    // const Imgur = await Services.findOne({ where : { name: "imgur"}});
    //if (data) {
        //const tab = [];
        ////const nbrLikes = data.lastResult;
        //const nbrLikes = 20;
        // const imgurId = Imgur.id;
        //const token = tokens.findOne({ where : { userId: user_id, serviceId: imgurId }});
        // const token = "722a44078190ad0f32b90095836391e1c4222d10";
        // const res = await axios.get(`https://api.imgur.com/3/account/me/images`,
        // {
        //     headers: {
        //         Accept: 'application/json',
        //         Authorization: `Bearer ${token}`
        //     }
        // }) || [];
        // const imageId = res.data.data.slice(-1)[0].id;
        // const resData = await axios.get(`https://api.imgur.com/3/gallery/image/${imageId}/votes`,
        // {
        //     headers: {
        //         Accept: 'application/json',
        //         Authorization: `Bearer ${token}`
        //     }
        // }) || [];
        // const likes = resData.data.data.ups;
        // console.log(likes);
        // if (nbrLikes < likes) {
        //     console.log("REACTION");
        //     console.log("SAVE IN DB");
        // }
    //}
    let count = 0;
    const tab = [];
    //const nbrLikes = data.lastResult;
    const nbrLikes = 20;
    // const imgurId = Imgur.id;
    //const token = tokens.findOne({ where : { userId: user_id, serviceId: imgurId }});
    const token = "722a44078190ad0f32b90095836391e1c4222d10";
    const res = await axios.get(`https://api.imgur.com/3/account/me/images`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }) || [];
    for (const elem of res.data.data) {
        const imageId = elem.id;
        const resData = await axios.get(`https://api.imgur.com/3/gallery/image/${imageId}/votes`,
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }) || [];
        const likes = resData.data.data.ups;
        count += likes;
    }
    console.log("likes = ", count);
    if (nbrLikes < count) {
        console.log("REACTION");
        console.log("SAVE IN DB");
    }
}
module.exports.run = run;