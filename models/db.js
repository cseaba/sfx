const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://calebseaba:tiger3404@cluster0.ip26s.mongodb.net/soundsDB?retryWrites=true&w=majority', 
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