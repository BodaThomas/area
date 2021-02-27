const axios = require("axios");

async function a() {
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

a();
//async () => await a();