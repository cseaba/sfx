const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
var soundsSchema = new mongoose.Schema({ 
    soundName: {
        type: String,
        required: 'This field is required'
    },
    firstName: {
        type: String,
        required: 'This field is required'
    },

})

mongoose.model("Sounds", soundsSchema);