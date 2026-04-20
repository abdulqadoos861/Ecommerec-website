const express = require('express');
const router =  express.Router();
const {registeruser} = require('../controllers/registrationController')

router.get('/',function(req,res){
    res.send("hello jee this is user side");
});
module.exports = router;