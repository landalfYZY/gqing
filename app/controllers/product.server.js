'use strict';

var http = require('request')
var ObjectId = require('mongodb').ObjectID;
function product (client, cog) {
    var col = client.db(cog.dbName).collection('products');
    var log = client.db(cog.dbName).collection('operationLog');

    this.insert = function(req,res){
        var filter = {
            title: req.body.title,//标题
            initPrice: req.body.initPrice,//价格
            carousel: req.body.carousel,//轮播图
            parameter:req.body.parameter,//参数
            richText:req.body.content,//富文本
            isShow:req.body.isShow   //上下架
        }
        var params = global.filterParams(filter);
        col.insertOne(params, function (err, data) {
            if (err) throw err;
            res.send({code:1000, msg:'添加成功',  result:data.ops[0]});
        });
    }

    this.find = function(req,res){
        var par = JSON.parse(req.body.params)
        if(par._id){
            par._id = ObjectId(par._id)
        }
        col.find(par).toArray(function (err, result){
            if (err) throw err;
            res.send({code:1000,result:result})
        })
    }
    this.update = function(req,res){
        var ids = JSON.parse(req.body.ids);
        for(var i  in ids){
            ids[i] = ObjectId(ids[i])
        }
        col.update({_id:{$in:ids}},{$set:JSON.parse(req.body.params)},{upsert: true,multi:true},function(err,data){
            if (err) throw err;
            res.send({code:1000,msg:'更新成功', result:data})  
        })
    }
}

module.exports = product;