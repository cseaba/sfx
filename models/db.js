const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/soundsDB', 
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