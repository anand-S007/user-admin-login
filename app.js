const express = require("express")
const app = express()
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4()
const nocache = require('nocache')
const session = require("express-session");
const PORT = 505

// ---------Mongose connection-----------------------------
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/userAdminBase")
mongoose.connection.on('connected',()=>{
    console.log('mongodb connected')
})
mongoose.connection.on('error',(error)=>{
    console.log(error+"Error found in connection")
})
mongoose.connection.on('disconnected',()=>{
    console.log('mongodb disconnected');
})
//-----------Mongoose connection---------------------------



app.set("view engine","ejs");
app.use("/public",express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({
    secret:uuid,
    resave:false,
    saveUninitialized:true
}))
app.use(nocache())


const routerUserFeat = require("./routes/userFeatures");
app.use('/userHome',routerUserFeat)

const adminRoute = require('./routes/admin');
app.use('/admin',adminRoute);

const routerAuthentication = require("./routes/userAuthentication");
app.use('/',routerAuthentication)

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
})