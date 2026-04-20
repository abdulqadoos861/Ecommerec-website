const mongoose = require('mongoose');
mongoose.connect('mongodb:??127.0.0.1:27017/scatch');
const userschema = mongoose.Schema({
    username : String,
    fullname : String,
    email : {
        type : string,
        unique : true,
        required : true,
    },
    password : String,
    cart : {
        type : Array,
        default:[]
    },
    isadmin : Boolean,
    orders : {
        type : Array,
        default:[]
    },
    contact : String,
    picture : String,
    address : string
});

module.exports = mongoose.model(user , userschema);