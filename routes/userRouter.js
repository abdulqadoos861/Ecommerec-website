const express = require('express');
const router =  express.Router();

router.get('/',function(req,res){
    res.send("hello jee this is user side");
});
module.exports = router;