/* eslint-disable */


const express = require('express');
const router = express.Router();
const assert = require('assert');
const multiparty = require('multiparty');

const {
  findDocuments,
  insertDocuments,
} = require('../module/db');


router.get('/', (req, res) => {
  res.render('login');
});
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/doRegister', (req, res) => {
  findDocuments('myproject', req.body, (docs) => {
    if (docs.length > 0) {
      res.send("<script>alert('账号已注册，请换一个注册');location.href='/register'</script>");
    } else {
    req.session.username=req.body.username
      insertDocuments('myproject', req.body, () => {
        res.send("<script>alert('账号注册成功'); location.href='/product'</script>");
      });
    }
  });
});
router.post('/doLogin', (req, res) => {
  findDocuments('myproject', req.body, (docs) => {
    if (docs.length > 0) {
        req.session.username=req.body.username
        res.redirect('/product');
    } else {
      res.send("<script>alert('账号密码输入错误或者没有注册');location.href='/'</script>");
    }
  });
});
module.exports=router