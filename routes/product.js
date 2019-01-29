/* eslint-disable */
const express=require('express')
const router=express.Router()
// const bodyParser = require('body-parser');
const assert = require('assert');
const multiparty = require('multiparty');

const {
    findDocuments,
    insertDocuments,
    ObjectID,
    updateDocument,
    removeDocument,
  } = require('../module/db');

router.get('/product', (req, res) => {
      findDocuments('myproject', {}, (data) => {
        res.render('product', {
          list: data,
        });
      }, 'addProduct');
  });
  router.post('/doSearch', (req, res) => {
    const da = req.body.title;
  
    findDocuments('myproject', {
      title: da,
    }, (data) => {
      if (data.length > 0) {
        res.render('product', {
          list: data,
        });
      } else {
        res.redirect('/product');
      }
    }, 'addProduct');
  });
  router.get('/add', (req, res) => {
    res.render('productadd');
  });
  router.get('/productedit', (req, res) => {
    findDocuments('myproject', { _id: new ObjectID(req.query.id) }, (data) => {
      if (data.length > 0) {
        res.render('productedit', {
          list: data[0],
        });
      }
    }, 'addProduct');
  });
  
  router.post('/upload', (req, res) => {
    const form = new multiparty.Form();
    form.uploadDir = 'upload';
  
    // eslint-disable-next-line consistent-return
    form.parse(req, (err, fields, files) => {
      if (err) {
        return false;
      }
      const title = fields.title[0];
      const price = fields.price[0];
      const fee = fields.fee[0];
      const descr = fields.description[0];
      const pic = files.pic[0].path;
      const data = {
        title,
        price,
        fee,
        descr,
        pic,
      };
      insertDocuments('myproject', data, () => {
        res.redirect('product');
      }, 'addProduct');
    });
  });
  router.post('/doAdd', (req, res) => {
    const form = new multiparty.Form();
    form.uploadDir = 'upload';
  
    // eslint-disable-next-line consistent-return
    form.parse(req, (err, fields, files) => {
      if (err) {
        return false;
      }
      console.log(fields, '12312312');
  
  
      const title = fields.title[0];
      const price = fields.price[0];
      const fee = fields.fee[0];
      const descr = fields.description[0];
      const pic = files.pic[0].path;
      const id = fields.id[0];
  
      const data = {
        title,
        price,
        fee,
        descr,
        pic,
      };
      updateDocument('myproject', { _id: new ObjectID(id) }, data, () => {
        res.redirect('product');
      }, 'addProduct');
    });
  });
  
  router.get('/productdelete', (req, res) => {
    const id = req.query.id;
    removeDocument('myproject', { _id: new ObjectID(id) }, (data) => {
      res.redirect('product');
    }, 'addProduct');
  });
  module.exports = router; 