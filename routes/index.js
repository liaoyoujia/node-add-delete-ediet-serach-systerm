/* eslint-disable */

const express = require('express');

const router = express.Router();
const product =require('./product')
const login=require('./login')


router.use((req,res,next)=>{
    if(req.url=='/'||req.url=='/doLogin'||req.url=='/register'||req.url=='/doRegister'){
        next()
    }else{
        if(req.session.username){
            next()
        }else{
            res.redirect('/')
        }
    }
})
router.use('/',login)
router.use('/',product)
module.exports=router