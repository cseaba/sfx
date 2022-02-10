const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Sounds = mongoose.model('Sounds');

router.get('/', (req, res) => {
    res.render('sounds/addOrEdit', {
        viewTitle: 'Insert Sound'
    })
})
router.post('/', (req, res) => {
    if(req.body._id ==''){
        insertRecord(req, res)
    } else {
        updateRecord(req, res)
    }
})

function insertRecord(req, res) {
    var sound = new Sounds();
    sound.soundName = req.body.soundName
    sound.firstName = req.body.firstName
    sound.save((err, doc) => {
        if(!err){
            res.redirect('sounds/list')
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
    Sounds.findByIdAndRemove(req.params.id, (err, docs) =>{
        if(!err){
            res.render('sounds/list');
        } else {
            console.log('Error in deletion: ' + err);
        }
    })
})

module.exports = router;
