/* eslint-disable */
const url = 'mongodb://localhost:27017';
const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;

function connectMon(dbName,callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    callback(db);
    client.close();
  });
}

// 增加数据
function insertDocuments(dbName,data, callback) {
  connectMon(dbName,(db) => {
    const collection = db.collection('documents');
    collection.insertMany([data], (err, result) => {
      if (err) {
        console.log('出错了');
      }
      callback();
    });
  });
}

// 查找数据
function findDocuments(dbName,data, callback) {
  connectMon(dbName,(db) => {
    const collection = db.collection('documents');
    collection.find(data).toArray((err, docs) => {
      assert.equal(err, null);
      callback(docs);
    });
  });
}

module.exports={
    insertDocuments,
    findDocuments
}

