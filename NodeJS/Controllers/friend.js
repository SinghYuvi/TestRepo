const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var{ Friends } = require('../models/friend');

//Get All Friends list/ => localhost:3000/Friends/list
router.get('/list', (req,res) =>{
    Friends.find((err,docs) => {
       if(!err)
       {res.send(docs);}
       else{ console.log('Error in retriving Friends list:' +JSON.stringify(err, undefined, 2));}
    });
}); 

//Get an Friends details with ID/ => localhost:3000/Friends/id
router.get('/:id', (req,res) =>{
          if(!ObjectId.isValid(req.params.id))
          return res.status(400).send(`No record with given id: ${req.params.id}`);

        Friends.findById(req.params.id,(err,doc) =>{
            if(!err){res.send(doc);}
            else{console.log('Error in retrieving Friends :' +JSON.stringify(err, undefined, 2));}   
        });
});


//Insert new Friends/ => localhost:3000/Friends/create 
router.post('/create',(req,res) =>{
       var frnd = new Friends({
           FriendID: req.body.FriendID,
           FriendName:req.body.FriendName,
           Place:req.body.Place
       });
       console.log(frnd);
           frnd.save((err,doc) =>{
       if(!err)
        {res.send(doc);}
        else{ console.log('Error while inserting new Friend:' +JSON.stringify(err, undefined, 2));}
       });
});

//Update Friends details/ => localhost:3000/Friends/update/id
router.put('/update/:_id', (req,res) =>{
    console.log(req.params._id);
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    var frnd = {
        FriendID: req.body.FriendID,
        FriendName:req.body.FriendName,
        Place:req.body.Place
    };

    Friends.findByIdAndUpdate(req.params.id, { $set:frnd }, {new :true},(err, doc) =>{
        if(!err){res.send(doc);}
        else{ console.log('Error while updating Friend details:' +JSON.stringify(err, undefined, 2));}
    });
});

//Delete Friends details/ => localhost:3000/Friends/delete/id  
router.delete('/delete/:id', (req,res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

    Friends.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(!err){res.send(doc);}
        else{ console.log('Error while deleting Frieds:' +JSON.stringify(err, undefined, 2));}
    });
});


module.exports = router;