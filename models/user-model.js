const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    username : String,
    fullname : String,
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : String,
    cart : {
        type : Array,
        default:[]
    },
    orders : {
        type : Array,
        default:[]
    },
    contact : String,
    picture : {
        type: String,
        default : "abc.jpg"
    },
    address : String,
    otp : Number,
    isverified : {
        type : Boolean,
        default : 0
    }
});

module.exports = mongoose.model('user', userschema);