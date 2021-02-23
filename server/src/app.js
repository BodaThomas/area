const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const db = require("./models/index.js");
//const init = require("./initDB");

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", require("./routes/user.routes"));
app.use("/tokens", require("./routes/tokens.routes"));
app.use("/service", require("./routes/service.routes"));
app.use("/", require("./routes/index.routes"));

try {
    db.sequelize.sync();
    //init.initDb();
    //const api = require("./Api/index.js")
}catch (err) {
    console.log(err);
}

app.listen(port, () => { console.log(`Listening on PORT = ${port}`)})
