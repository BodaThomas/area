const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

const router = require('./router');

app.use(morgan('combined'));
app.use(cors());
app.use(router);

try {
    const db = require("./models/index.js")
    db.sequelize.sync();
}catch {

}

app.listen(port, () => { console.log(`Listening on PORT = ${port}`)})