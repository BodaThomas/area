const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const router = require('./routes/user.routes');
const db = require('./models');

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

try {
    const db = require("./models/index.js")
    db.sequelize.sync();
}catch (err) {
    console.log(err);
}

app.listen(port, () => { console.log(`Listening on PORT = ${port}`)})


// const mailjet = require ('node-mailjet')
// .connect('0cf0ce48886fd43ba8128d537134eb19', '4994fcdf1a1623664a9ea63c5022fc4b')
// const request = mailjet
// .post("send", {'version': 'v3.1'})
// .request({
//   "Messages":[
//     {
//       "From": {
//         "Email": "area.tek.2023@gmail.com",
//         "Name": "Area"
//       },
//       "To": [
//         {
//           "Email": "area.tek.2023@gmail.com",
//           "Name": "Area"
//         }
//       ],
//       "Subject": "Greetings from Mailjet.",
//       "TextPart": "My first Mailjet email",
//       "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
//       "CustomID": "AppGettingStartedTest"
//     }
//   ]
// })
// request
//   .then((result) => {
//     console.log(result.body)
//   })
//   .catch((err) => {
//     console.log(err.statusCode)
//   })
