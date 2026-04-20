const mongoose = require('mongoose');


const ownerschema = mongoose.Schema({
    username : String,
    fullname : String,
    email : {
        type : string,
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
    address : string
});

module.exports = mongoose.model(owner , ownerschema);