
'use strict';

var ObjectId = require('mongodb').ObjectID;
function specifications (client, cog) {
    var col = client.db(cog.dbName).collection('specifications');

    this.insert = function (req,res) {
        var filter = {
            productId:req.body.productId,
            title: req.body.title,//标题
            price: req.body.price,//价格
            image: req.body.image,//图片
            weight:req.body.weight,//重量
        }
        var params = global.filterParams(filter);
        col.insertOne(params, function (err, data) {
            if (err) throw err;
            res.send({code:1000, msg:'添加成功',  result:data.ops[0]});
        });
    }

    this.find = function(req,res) {
        var par = JSON.parse(req.body.params)
        if(par._id){
            par._id = ObjectId(par._id)
        }
        col.find(par).toArray(function (err, result){
            if (err) throw err;
            res.send({code:1000,result:result})
        })
    }

    
}

module.exports = specifications;