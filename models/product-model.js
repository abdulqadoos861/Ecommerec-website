const mongoose = require('mongoose');
const { diskStorage } = require('multer');

const productschema = mongoose.Schema({
    image : String,
    name : String,
    price : Number,
    discount : {
        type : Number,
        default : 0
    },
    bgcolor : String,
    textcolor : String
});

module.exports = mongoose.model('product' , productschema);