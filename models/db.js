const mongoose = require('mongoose')
require('dotenv').config() //This lets this file be stored on Github without showing password on github 

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://calebseaba:'+ process.env.MONGODB_PASSWORD + '@cluster0.ip26s.mongodb.net/soundsDB?retryWrites=true&w=majority', 
{ 
useNewUrlParser: true,
},
(err) =>{
    if(!err){
        console.log('Connetion succedded')
    } else {
        console.log('Error in connection ' + err)
    }
});

require('./sounds.model');
