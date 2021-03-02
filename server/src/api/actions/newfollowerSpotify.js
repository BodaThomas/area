const { default: axios } = require("axios");
const db = require("../../models");
const Actions = db.actions;

const nameAction = "New follower Spotify"

async function create() {
    obj = await Actions.findOne({ where: {name: nameAction}})
    const action = {
        name: nameAction,
        serviceId: 4,
        description: "Check if there is a new follower",
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

async function run(element) {
    const token = "BQDPilJT0DeoNz88SVrTORtF6sidKH0ZKt6-9tMyAW4OBPQwItPXZA75SQSWdIIbaMjPTjFY6Kx8-bY00ys_Gd9L4Fs46MRqmxmM3GK9C5P58GkGNnow4uRIT06idjxVgbZkJPHp6oR-s6gfAOxMwblDwSi8jnIzOjTzC_J-Hd9u"
    const lastFollowers = Number(element.lastResult)
    
    const res = await axios.get('https://api.spotify.com/v1/me',
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error.message)
    }) || []
    if (lastFollowers != res.data.followers.total) {
        element.lastResult = res.data.followers.total;
        element.save();
        if (lastFollowers < res.data.followers.total) {
            return true;
        }
    }
    return false;
}
module.exports.run = run;