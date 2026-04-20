const mongoose = require('mongoose');


const ownerschema = mongoose.Schema({
    username : String,
    fullname : String,
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : String,
    products : {
        type : Array,
        default:[]
    },
    contact : String,
    picture : String,
    address : String,
    otp : Number,
    isverified : {
        type : Boolean,
        default : 0
    }
});

module.exports = mongoose.model('owner' , ownerschema);