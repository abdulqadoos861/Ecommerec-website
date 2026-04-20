const usermodel = require('../models/user-model');
const ownerModel = require('../models/owner-model')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const mailtransponder = require('../config/mailtransponder');
require('dotenv').config();


exports.registeruser = async (req , res)=>{
    const  {username , fullname , email , password , contact , address} = req.body;
    const existed = await usermodel.findOne({email});
    if (existed) return res.status(409).json({
        message : `user : ${email} already regiostered.`
    })
    else{
        const otp = generateOtp()
        const hashed = await bcrypt.hash(password , 10)
        const createduser = await usermodel.create({
            username,
            fullname,
            email,
            password : hashed,
            contact,
            address,
            otp
        })
        if (!createduser)  return res.status(400).json({
            message : "an Error Occured try again"
        })
        else{
            sendotp(email , otp);
            res.render('verifyOTP.ejs')

        }

    }

}
function generateOtp(){
    return Math.floor(100000 + Math.random() * 900000)
}
async function sendotp(email , otp){
    await mailtransponder.sendMail({
        from : process.env.GMAIL,
        to : email,
        subject :'OTP Verification',
        text : `For verifaction at ${process.env.WEB_NAME} your verification code is ${otp}. Thank you fro registaration.`
    });

}
exports.verify_otp = async function (req,res){
    const {email , otp} = req.body;
    const user = await usermodel.findOne({email});
    if (!user){
        return res.send("User is not registered go and register first.")
    }
    else{
        if (user.otp == otp){
            user.isverified = 1
            user.save();
            res.render('userlogin.ejs');
        }
    }
}
exports.verify_ownerotp = async function (req,res){
    const {email , otp} = req.body;
    const user = await ownerModel.findOne({email});
    if (!user){
        return res.send("User is not registered go and register first.")
    }
    else{
        if (user.otp == otp){
            user.isverified = 1
            user.save();
            res.render('ownerlogin.ejs');
        }
    }
}

exports.userlogin = async function (req,res) {
    const {email , password} = req.body;
    const user = await usermodel.findOne({email});
    if (!user){
        console.log("invalid email address")
        return res.render('userlogin.ejs',{message : "invalid login deatils"});
        }
    else{
        const verify = await bcrypt.compare(password , user.password);
        if (!verify){
        console.log("invalid password")
        return res.render('userlogin.ejs',{message : "invalid login deatils"});
        
        }
        else{
            console.log("Loged in success");
            const token = jwt.sign({id : user._id , email : user.email} , process.env.JWT_KEY);
            res.cookie("token" , token);
            res.render('userdashboard');
        }
    }
}

exports.registerOwner = async (req, res) => {
    try {

        const { username, fullname, email, password, contact, address } = req.body;

        const existed = await ownerModel.findOne({ email });

        if (existed) {
            return res.status(409).json({
                message: `Owner: ${email} already registered.`
            });
        }

        // generate OTP
        const otp = generateOtp();

        // hash password
        const hashed = await bcrypt.hash(password, 10);

        // create owner
        const createdOwner = await ownerModel.create({
            username,
            fullname,
            email,
            password: hashed,
            contact,
            address,
            otp   // ⚠️ only works if field exists in schema
        });

        if (!createdOwner) {
            return res.status(400).json({
                message: "An error occurred, try again"
            });
        }

        // send OTP to email
        sendotp(email, otp);

        console.log("Owner created, OTP sent");

        res.render('verifownerotp.ejs', {
            email: email
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

exports.ownerlogin = async function (req, res) {

    const { email, password } = req.body;

    const owner = await ownerModel.findOne({ email });
    if (!owner) {
        console.log("Invalid email address");
        return res.render('ownerlogin.ejs', {
            message: "Invalid login details"
        });
    }
    if (!owner.isverified) {
        console.log("Owner not verified");
        return res.render('ownerlogin.ejs', {
            message: "Please verify your email first"
        });
    }

    const verify = await bcrypt.compare(password, owner.password);

    if (!verify) {
        console.log("Invalid password");
        return res.render('ownerlogin.ejs', {
            message: "Invalid login details"
        });
    }

    const token = jwt.sign(
        { id: owner._id, email: owner.email },
        process.env.JWT_KEY,
        { expiresIn: "1d" }
    );
    res.cookie("token", token, {
        httpOnly: true
    });

    console.log("Owner logged in successfully");
    res.render('ownerdashboard.ejs');
};