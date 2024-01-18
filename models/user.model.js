const mongoose = require('mongoose'); 

var userSchema = new mongoose.Schema({ 
	user: {
		type: String,
		required:'This field is required'
	},
	password: { 
		type: String, 
		required:'This field is required'
	},
})

mongoose.model("users", userSchema);
		
