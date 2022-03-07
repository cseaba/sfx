require('./models/db');
const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {
    allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');

const studentController = require("./controllers/soundcontroller")

var app = express();
const port = 3000;


app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(express.static(__dirname + '/Public/'));
app.use('/Public/' , express.static(__dirname + '/Public/'));
app.get ('/', (req, res) => {
    res.sendFile('/Public/sfx.html', { root: __dirname});
})

app.set('views', path.join(__dirname, 'views/'));

app.engine('hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout:'mainLayout',
    layoutDir: __dirname + 'views/layouts/'
}));

app.set("view engine", "hbs")

app.listen(port, () => {
    console.log(`SFX app listening on port ${port}!`)
})
app.use("/sounds", studentController);