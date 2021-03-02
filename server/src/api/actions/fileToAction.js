const axios = require("axios");
const { user } = require("../../models");

async function new_like() {
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

async function new_post_from() {
    let count = 0;
    const nbrPost = 1;
    const username = "orbitn";
    const token = "722a44078190ad0f32b90095836391e1c4222d10";
    const res = await axios.get(`https://api.imgur.com/3/account/me/images/count`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }) || [];
    if (res.data.success == "false") {
        console.log("Error");
        return;
    }
    count = res.data.data;
    console.log("nbr images =", count);
    if (nbrPost < count) {
        console.log("REACTION");
        console.log("SAVE IN DB");
    }
}

async function new_follower_twitch() {
    let count = 0;
    let userId;
    const nbrFollowers = 5;
    const clientId = "bt90xzsoeiga923igrfds34xi9uspa";
    const token = "zun7cviqqlpnwwgxazv91fyntt79pv";
    const res = await axios.get(`https://api.twitch.tv/helix/users`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Client-Id': `${clientId}` 
        } 
    }).then((response) => {
        userId = response.data.data[0].id;
    });
    const resData = await axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Client-Id': `${clientId}` 
        } 
    }).then((response) => {
        count = response.data.total;
    });
    if (nbrFollowers < count) {
        console.log("REACTION");
        console.log("SAVE IN DB");
    }
}

async function new_guild(user_id) {
    const nameGuild = "EXCELLIUM";
    const nameChannel = "blabla";
    let nbrGuilds = 5;
    const token = "F4GVkGEQ8rQbailU5yB3t3L2cYteaC";
    let count = 0;
    const guilds = await axios.get(`https://discordapp.com/api/users/@me/guilds`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        } 
    }).then((response) => {
        // response.forEach(element => {
        //     count = count + 1;
        // });
        count = response.data.length;
    });
    console.log(count);
    if (nbrGuilds < count) {
        console.log("REACTION");
        console.log("SAVE IN DB");
    }
}

async function new_issue(user_id) {
    const token = "3ecdc066b7686c3d3b056aeff495b0052fe82de8";
    const nbrIssues = 1;
    let count = 0;
    const nameRepo = "TEST-AREA";
    const repos = await axios.get(`https://api.github.com/user/repos`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        } 
    }).then((response) => {
        response.data.forEach(element => {
            if (element.name == nameRepo) {
                count = element.open_issues_count;
            }
        });
    });
    console.log(count);
    if (nbrIssues < count) {
        console.log("REACTION");
        console.log("SAVE IN DB");
    }
}

async function new_message(user_id) {
    const token = "3ecdc066b7686c3d3b056aeff495b0052fe82de8";
    const nbrIssues = 1;
    let count = 0;
    const nameRepo = "TEST-AREA";
    const repos = await axios.get(`https://api.github.com/user/repos`,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        } 
    }).then((response) => {
        response.data.forEach(element => {
            if (element.name == nameRepo) {
                count = element.open_issues_count;
            }
        });
    });
    console.log(count);
    if (nbrIssues < count) {
        console.log("REACTION");
        console.log("SAVE IN DB");
    }
}

// console.log("NEW LIKE:");
// new_like();
// console.log("\nNEW POST FROM:");
// new_post_from();
// console.log("NEW FOLLOWER TWITCH");
// new_follower_twitch();
// console.log("NEW GUILD");
// new_guild();
// console.log("NEW_ISSUE");
// new_issue();
console.log("NEW MESSAGE");
new_message();