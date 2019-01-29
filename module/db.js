/* eslint-disable */
const url = 'mongodb://localhost:27017';
const assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;



function connectMon(dbName,callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    callback(db);
    client.close();
  });
}

// 增加数据
function insertDocuments(dbName,data,callback,collectName) {
  connectMon(dbName,(db) => {
    const collect=collectName||'document'
    const collection = db.collection(collect);
    collection.insertMany([data], (err, result) => {
      if (err) {
        console.log('出错了');
      }
      callback();
    });
  });
}

// 查找数据
function findDocuments(dbName,data,callback,collectName) {
  connectMon(dbName,(db) => {
    const collect=collectName||'document'
    const collection = db.collection(collect);
    collection.find(data).toArray((err, docs) => {
      assert.equal(err, null);
      callback(docs);
    });
  });
}


//更新数据
function updateDocument(dbName,fromData,behindData, callback,collectName) {
  connectMon(dbName,(db) => {
    const collect=collectName||'document'
    const collection = db.collection(collect);
  collection.updateOne(fromData
    , { $set: behindData }, function(err, result) {
      if(err){
        console.log(err);
      }
    callback(result);
  });
})}


// 删除数据

function removeDocument(dbName,data ,callback,collectName) {
  connectMon(dbName,(db) => {
    const collect=collectName||'document'
    const collection = db.collection(collect);
  collection.deleteOne(data, function(err, result) {
   if(err){
     console.log(err);
   }
    callback(result);

      });
    })
}
module.exports={
    insertDocuments,
    findDocuments,
    updateDocument,
    ObjectID,
    removeDocument
}

