const express = require('express');
const { verify } = require('../config/mailtransponder');
const router = express.Router();
const authentication = require('../controllers/registrationController')

router.post('/verify-otp' ,authentication.verify_otp);
router.post('/register' , authentication.registeruser);
router.post('/userlogin' , authentication.userlogin);
router.post('/ownerregister', authentication.registerOwner);
router.post('/verify-ownerotp' , authentication.verify_ownerotp)
router.post('/ownerlogin',authentication.ownerlogin);
router.get('/verifyOTP',(req,res)=>{
    res.render('verifyOTP.ejs')
})
router.get('/register',function(req,res){
    res.render('register.ejs');
});
router.get('/userlogin' , function(req,res){
    res.render('userlogin.ejs')
})
router.get('/ownerregister' , (req,res)=>{
    res.render("ownerRegister.ejs")
})
router.get('/ownerlogin',(req,res)=>{
    res.render('ownerlogin.ejs')
})
router.get('/verifyOwnerOTP',(req,res)=>{
    res.render('verifyownerotp.ejs');
})
router.get('/', (req,res)=>{
    res.send("authentication route working");
});

module.exports = router;