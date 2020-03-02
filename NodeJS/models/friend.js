const mongoose = require('mongoose');

var Friends = mongoose.model('Friends',{
    FriendID:{type:Number},
    FriendName: {type:String},
    Place:{type:String},
        
},'FriendsList');

module.exports = {Friends};