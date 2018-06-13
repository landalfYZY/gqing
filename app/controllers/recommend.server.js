
'use strict';

var ObjectId = require('mongodb').ObjectID;
function recommend (client, cog) {
    var col = client.db(cog.dbName).collection('recommends');

    this.insert = function (req,res) {
        var filter = {
            image:req.body.image,
            productId:req.body.productId,
            type: req.body.type,// 类型 1位推荐  2热门
            sort: req.body.sort,//排序
            productName:req.body.productName
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

module.exports = recommend;