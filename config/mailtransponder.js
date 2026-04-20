const nodemailer = require('nodemailer');
require ('dotenv').config();

const transporter = nodemailer.createTransport({
   service:'gmail',
   port : 587,
   auth:{
      user:'abdulqadoosbhatti5257@gmail.com',
      pass:process.env.MAIL_KEY
   }
});
module.exports = transporter;