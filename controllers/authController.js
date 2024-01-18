const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const passport = require('passport');



var router = express.Router();




router.get('/', checkNotAuthenticated, (req, res) => {
	 res.render('login', {
		 viewTitle: 'Login'
	 })
})

router.post('/', passport.authenticate('local', {
	successRedirect:'/sounds/list',
	failureRedirect:'/login',
	failureFlash: true

}))

function checkNotAuthenticated(req,res, next) { 
	if(req.isAuthenticated()) {
		return res.redirect('/sounds/list')
	}
	next()
}

module.exports = router; 
