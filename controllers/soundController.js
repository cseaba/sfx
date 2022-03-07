const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Sounds = mongoose.model('Sounds');
const multer = require('multer');
const upload = multer({dest:"Public/Sound"});
const fs = require('fs');
const res = require('express/lib/response');
const { response } = require('express');
var form_element_name = "sound"

router.get('/', (req, res) => {
    res.render('sounds/addOrEdit', {
        viewTitle: 'Insert Sound'
    })
})
router.post('/', upload.single(form_element_name), (req, res) => {
    if(req.body._id ==''){
        insertRecord(req, res)
        
    } else {
        updateRecord(req, res)
    }
})

function insertRecord(req, res) {
    var csound = new Sounds();
    csound.soundName = req.body.soundName
    csound.firstName = req.body.firstName
    
    csound.sound = req.file.path
    console.log(req.file.path)
    csound.save((err, doc) => {
        if(!err){
            res.redirect('sounds/list')
            console.log("Insertion completed")
        } else {
            console.log('Error during insert: ' + err)
        }
    })
}

function updateRecord(req, res) {


    Sounds.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('sounds/list');
        } else {
            console.log('Error during update: ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Sounds.find((err, docs) => {
        if(!err) {
            res.render('sounds/list', {
            list: docs,
            });
        } else {
            console.log("Error in retrevial: " + err);
        }
    })
})

router.get('/pg/:pg', (req, res) => {
    let pg = req.params.pg
    let skip = 0
    //tells the slice function how many items to skip
    if (pg < 2) {
       
    skip = 0;
    } else {
    skip = 12 * (pg -1 ) 
    
    }
    //gets 12 sound items for somewhere in the db
    Sounds.find().sort({$natural: 1}).skip(skip).limit(12).then((result => {
        res.send(result)
    })).catch((err) => {
        res.sendStatus(500)
    });
    
    
});

router.get('/:id', (req, res) => { 
    Sounds.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render('sounds/addOrEdit', {
                viewTitle: 'Update Sound',
                Sounds: doc
            })
        console.log(doc);
        }
    })
})

router.get('/delete/:id', (req, res) => {
    
    Sounds.findById(req.params.id, (err, doc) => {
        fs.unlink(doc.sound, function(err){
            if(err) console.log(err);
             console.log("Deletion from system succsessful")
        })
    });
    
    Sounds.findByIdAndRemove(req.params.id, (err, docs) =>{
        if(!err){
            
            
            res.render('sounds/list');
        } else {
            console.log('Error in deletion: ' + err);
        }
    })
})

module.exports = router;
