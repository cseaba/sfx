require('./models/db');
require('dotenv').config()
const mongoose = require('mongoose');
const User = mongoose.model('users');
const express = require('express');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars'); //express handlbars is a view templating package that makes some things simpler
const {
    allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');

const passport = require('passport')

const bcrypt = require('bcrypt');  //for encryption of passwords 
const initializePassport = require('./passport-config')
initializePassport(
	passport,
	async username => {
	//	return /*find a way to find the username from mongoDb */.find(user => user.username === username)
		return await User.findOne({user: username}).exec();
	}, 
	async id => await User.findOne({id: id}).exec() 

)



const soundController = require(__dirname+ "/controllers/soundController.js")
const authController = require(__dirname+ "/controllers/authController.js")

var app = express();
const port = 3000;

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false, //stops saving of session variables if nothing is saved 
	saveUninitialized: false //do not save an empty value for the session 
}))

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyparser.urlencoded({extended: false})); //allows the body of reqests to be read 
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
app.use("/login", authController); 
app.use("/sounds", soundController);
