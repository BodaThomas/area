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

async function run() {
    const token = "BQB6BvCszExc-_QDw49ONXjQuyZR8Kvg1jZZzw2EGiY2JIYJG35OLE-102ewRD0wTySG_ROzX2QtBkjJ2OzCoRbx4fH3kzMjoOAOjOuCDt3JfH7XF4Xs4amPdn7x_-YJDrIvmCBIdFzLJ-kUQxWIxMMKJUbvW_P-AJY7w0cjNXev"
    const lastFollowers = -1
    
    const res = await axios.get('https://api.spotify.com/v1/me',
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }) || []
    console.log(res.data)
    if (lastFollowers < res.data.followers.total) {
        console.log("SAVE DB")
        console.log("REACTION")
    }
}
module.exports.run = run;