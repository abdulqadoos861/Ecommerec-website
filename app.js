const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongooseConnection.js');
const ownerRouter = require('./routes/ownerRouter.js');
const  userRouter = require('./routes/userRouter.js');
const productsRouter = require('./routes/productsRouter.js')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));
app.use(cookieParser());
app.set('view engine','ejs');

app.use('/owner',ownerRouter);
app.use('/user',userRouter);
app.use('/product' , productsRouter);

app.get('/',function (req , res){
    res.send('Hello je kaisa hn ap .');
}); 

app.listen(1000 , function(req , res){
    console.log(`Server is live on http://localhost:1000`);
})
