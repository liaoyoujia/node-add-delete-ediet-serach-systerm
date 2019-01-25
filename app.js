
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const assert = require('assert');
const multiparty = require('multiparty');


const { findDocuments, insertDocuments } = require('./module/db');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.post('/doRegister', (req, res) => {
  findDocuments('myproject', req.body, (docs) => {
    if (docs.length > 0) {
      res.send("<script>alert('账号已注册，请换一个注册');location.href='/register'</script>");
    } else {
      insertDocuments('myproject', req.body, () => {
        res.send("<script>alert('账号注册成功'); location.href='/product'</script>");
      });
    }
  });
});
app.post('/doLogin', (req, res) => {
  findDocuments('myproject', req.body, (docs) => {
    if (docs.length > 0) {
      res.render('product');
    } else {
      res.send("<script>alert('账号密码输入错误或者没有注册');location.href='/'</script>");
    }
  });
});

app.get('/product', (req, res) => {
  res.render('product');
});

app.get('/add', (req, res) => {
  res.render('productadd');
});
app.get('/edit', (req, res) => {
  res.render('productedit');
});
app.post('/upload', (req, res) => {
  const form = new multiparty.Form();
  form.uploadDir = 'upload';

  // eslint-disable-next-line consistent-return
  form.parse(req, (err, fields, files) => {
    if (err) {
      return false;
    }
    console.log(files, 3123123, fields);
  });
  res.send('3123123123');
});

app.listen(8090);
