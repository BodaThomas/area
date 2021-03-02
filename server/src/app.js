const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const db = require("./models/index.js");
const Action = require("./action.js")
const initDB = require("./initDB.js")

var corsOptions = {
    origin: ["http://localhost:8081", "http://localhost:3000"]
};

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", require("./routes/user.routes"));
app.use("/tokens", require("./routes/tokens.routes"));
app.use("/service", require("./routes/service.routes"));
app.use("/", require("./routes/index.routes"));


const init = async () => {
    try {
        await db.sequelize.sync();
        await initDB.create()
        setInterval(Action.checkAction, 10000)
    }catch (err) {
        console.log(err);
    }
}
init()
app.listen(port, () => { console.log(`Listening on PORT = ${port}`)})
