const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const userRouter = require('./routes/user.routes');
const serviceRouter = require('./routes/service.routes');
const tokensRouter = require('./routes/tokens.routes');
const db = require('./models');
const api = require("./Api/index.js")

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
app.use(serviceRouter);
app.use(tokensRouter);

try {
    const db = require("./models/index.js")
    db.sequelize.sync();
}catch (err) {
    console.log(err);
}

app.listen(port, () => { console.log(`Listening on PORT = ${port}`)})
