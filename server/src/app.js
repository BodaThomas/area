const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const router = require('./routes/user.routes');
const db = require('./models');

var corsOptions = {
    origin: ["http://localhost:8081", "http://localhost:3000"]
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
