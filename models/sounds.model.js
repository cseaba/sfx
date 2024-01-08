const { contentType } = require('express/lib/response');
const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
var soundsSchema = new mongoose.Schema({ 
    soundName: {
        type: String,
        required: 'This field is required'
    },
   sound: {
       type: String,
   },
})

mongoose.model("Sounds", soundsSchema);
