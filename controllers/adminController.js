const express = require('express');
const User = require('../models/userModel')
const session = require('express-session')


// ------------Admin login--------------------
const adminLoginPage = async(req,res)=>{
    try{
        if(req.session.admin){
            res.redirect('/admin/adminhome')
        }else{
            res.render('adminLogin')
        }
    }catch(error){
        console.log(error.message);
    }
   
}

const adminLogin = async(req,res)=>{
    try {
        if(req.session.admin){
            res.redirect('/admin/adminhome')
        }else{
            console.log('admin login load');
            const logemail = req.body.email
            const logpassword = req.body.password
            console.log(logemail,logpassword);
            const loggedAdmin = await User.findOne({
                email:logemail,
                password:logpassword,
                isAdmin:1
            })
            console.log("loggedAmin:",loggedAdmin);
            if(loggedAdmin){
                req.session.admin = loggedAdmin
                res.redirect('/admin/adminhome')
                console.log('admin home redirected');
            } else{
                res.redirect('/admin')
                console.log('admin page 1');
            }
                }
        }catch (error) {
        console.log(error.message);
    }
    
}

// ----------------Admin home-----------------------------

const adminHome = async(req,res)=>{
    try {
        
        if(req.session.admin){
            const userData = await User.find({
                isAdmin:0,
            })
            const adminData = await User.findOne({name:req.session.admin.name})
            console.log('admin home page rendered');
            // console.log('userData:',userData,"adminData:",adminData);
            res.render('adminHome',{user:userData,name:adminData.name});
        }else{
            res.redirect('/admin')
            console.log('admin page 2');
        }
    } catch (error) {
        console.log(error.message);
    }
}

// -------------Create User-------------------------

const createUserPage = async(req,res)=>{
    if(req.session.admin){
        res.render('adminCreateUser',{name:req.session.admin.name})
    }else{
        res.redirect('/admin')
    }
}

const createUser = async(req,res)=>{
    try {
        if(req.session.admin){
            const userData = {
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
                password:req.body.password,
                isAdmin:0
            }
            let emailExists = await User.findOne({email:userData.email})
            console.log(emailExists)
            if(emailExists){
                res.redirect('/admin/adminhome/createuser');
            }else{
                const result = await User.create(userData);
                if(result){
                res.redirect('/admin/adminhome')
                 }else{
                res.redirect('/admin/adminhome/createuser')
                }
            }
            
        }else{
            res.redirect('/admin')
        }
        
    } catch (error) {
        console.log(error.message, 'Error while admin creating user');
    }
}

// ----------------Search User---------------------------
const searchUser = async(req,res)=>{
    try {
        if(req.session.admin){
            const searchData = req.body.search
            console.log(searchData);
            const searchedUser =await User.find({$and:[{name:{$regex: new RegExp(searchData,'i')},},{isAdmin:0}]})
            const adminData = await User.find({isAdmin:req.session.admin.isAdmin})
    
            if(searchedUser && adminData){
                res.render('adminHome',{name:adminData.name,user:searchedUser})
            }else{
                res.redirect('/admin/adminhome')
            }
        }else{
            res.redirect('/admin');
            console.log('admin page 3');
        }
    } catch (error) {
        console.log(error.message, 'Error found while searching user');
    }
}

// ---------------------edit user---------------------------
const editUserPage = async(req,res)=>{
    console.log('entered edit page');
    if(req.session.admin){
        const userId = req.query.userid
        const userData = await User.findById({_id:userId})
        res.render('adminUserEdit',{edituser:userData,name:req.session.admin.name})
    }else{
        res.redirect('/admin')
    }
}

const editUserSave = async(req,res)=>{
    try {
        if(req.session.admin){
            const editedData = {
                id:req.body.id,
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
            }
            await User.findByIdAndUpdate({_id:editedData.id},{$set:{name:editedData.name,email:editedData.email,mobile:editedData.mobile}})
            res.redirect('/admin/adminhome')
        }else{
            res.redirect('/admin')
        }
        
    } catch (error) {
        console.log(error.message," Error while Saving edited user by admin");
    }
}

// -----------------Delete User---------------------
const deleteUser = async(req,res)=>{
    try {
        if(req.session.admin){
            uid = req.query.userid
            const result = await User.findByIdAndDelete({_id:uid})
            if(result){
                res.redirect('/admin/adminhome')
            }
        }else{
            res.redirect('/admin')
        }
    } catch (error) {
        console.log(error,'Error found while deleteing user by admin');
    }
}

// ------------------Admin logout--------------------------
const adminlogout = async (req,res)=>{
    try {
        if(req.session.admin){
            req.session.destroy((error)=>{
                if(error){
                    console.log(error.message, 'error found while admin logout');
                }else{
                    console.log('admin logout successfully');
                    res.redirect('/admin')
                }
            })
        }else{
            res.redirect('/admin')
            console.log('admin page 4');
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    adminLoginPage,
    adminLogin,
    adminHome,
    adminlogout,
    createUserPage,
    createUser,
    searchUser,
    editUserPage,
    editUserSave,
    deleteUser,
}