const axios = require("axios");

async function send_mail() {
    const token = await Tokens.findOne({ where : { userId: element.userId, serviceId: element.serviceId }}).accessToken;
    const tab = element.paramsReaction.split(",");
    const mail = tab[0];
    const corps = tab[1];
    const message = new MIMEText();
    message.setRecipient(mail);
    message.setSubject('AREACTION 🚀');
    message.setMessage(corps);
    const raw = {
        raw: message.asEncoded()
    };
    const res = await axios.post('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', raw,
    {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).catch((error) => {
        console.log(error.message)
    });
    console.log("Gmail response:", res);
}