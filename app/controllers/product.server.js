'use strict';

var http = require('request')

function product (client, cog) {
    var col = client.db(cog.dbName).collection('products');
    var log = client.db(cog.dbName).collection('operationLog');

    this.insert = function(req,res){
        var filter = {
            title: req.body.title,//标题
            initPrice: req.body.initPrice,//价格
            carousels: req.body.carousels,//轮播图
            parameter:req.body.parameter,//参数
            richText:req.body.richText,//富文本
            isShow:req.body.isShow   //上下架
        }
        var params = global.filterParams(filter);
        col.insertOne(params, function (err, data) {
            if (err) throw err;
            res.send({code:1000, msg:'添加成功',  result:data.ops[0]});
            client.close();
        });
    }
}

module.exports = product;