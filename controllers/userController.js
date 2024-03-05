const session = require('express-session');
const User = require('../models/userModel');
const express = require('express');

const registerPage = (req,res)=>{
    if(req.session.User){
        res.redirect('/userHome')
    }else{
        res.render('signup')
    }
}
const loginPage = (req,res)=>{
    if(req.session.user){
        res.redirect('/userHome')
    }else{
        res.render('login')
    }
}

const login = async (req,res)=>{
    try {
        if(req.session.user){
            res.redirect('/userHome');
            console.log('redirected to userHome');
        }else{
            logemail = req.body.email
            logpassword = req.body.password
             const loggedUser = await User.findOne({
               email:logemail,
               password:logpassword
             })
             if(loggedUser){
               console.log("session created");
               req.session.user = loggedUser
               res.redirect('/userHome')
             }else{
               res.redirect('/')
             }  
        }
     
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

const loadUserHome = async(req,res)=>{
    try{
        if(req.session.user){
        res.render('userHome',{name:req.session.user.name})
    }else{
        res.redirect('/')
    }
    }catch(err){
        console.log(err.message)
    }
}

const insertUser= async(req,res)=>{
    try {
        console.log(req.body);
        userInsert = {
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            password:req.body.password,
            isAdmin:0,
        }
        const result = await User.create(userInsert);
        if(result){
            console.log('registered successfully');
            res.redirect('/');
        }
    } catch (error) {
        res.send(error.message)
        console.log(error.message);
    }
} 

const logout = (req,res)=>{
    if(req.session.user){
        req.session.destroy((error)=>{
            if(error){
                console.log(error,"Error found in session destroy!!!!!!!");
            }else{
                console.log("session destroyed");
                res.redirect('/')
            }
        })
    }
}

const viewProfile = async(req,res)=>{
    if(req.session.user){
        const userData = await User.findOne({
            _id:req.session.user._id
        })
        res.render('userProfile',{user:userData,name:userData.name})

    }else{
        res.redirect("/")
    }
}

const editprofilePageLoad = async(req,res)=>{
    if(req.session.user){
        res.render('userEditProfile',{user:req.session.user,name:req.session.user.name})
    }else{
        res.redirect('/')
    }
}

const editprofile = async(req,res)=>{
    try {
        if(req.session.user){
            const uName = req.body.name
            const uEmail = req.body.email
            const uMobile = req.body.mobile
            const currentPass = req.body.password1
            const newPass = req.body.password2
            const uData = await User.findById({_id:req.session.user._id})
            console.log('edit profile entered');
            console.log(`user data = ${uData}`);
            if(currentPass == uData.password){
                console.log('current password equal to old password');
                data = {name:uName,
                        email:uEmail,
                        mobile:uMobile,
                        password:newPass}
                    const result = await User.findByIdAndUpdate({_id:uData._id},{$set:data})
                    console.log(`result = ${result}`);
                    if(result){
                        res.redirect('/userHome/viewprofile');
                        console.log('redirected to logout after getting the result');
                    }else{
                        res.redirect('/userHome/editprofile')
                        console.log('redirected to editprofile not getting the result');
                    }
            }else{
                res.redirect('/userHome/viewprofile')
                console.log('current password not equal to old password');
            }
 
        }else{
            res.redirect('/')
            console.log("redirected to the login page due to no session");
        }
         
    } catch (error) {
        console.log(error, "Error found while editing user details");
    }
}



module.exports ={
    registerPage,
    loginPage,
    login,
    insertUser,
    logout,
    loadUserHome,
    viewProfile,
    editprofilePageLoad,
    editprofile,
}