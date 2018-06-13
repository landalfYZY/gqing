
'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var cog = require('./app/util/config.js');
var app = express();

var os = require('os');  



mongo.connect(cog.databaseUrl, function (err, client) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }

    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    app.use('/entitys',express.static(process.cwd() + '/app/entitys'));

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json({type: 'application/*+json'}));
    //全局加载
    app.all('*',function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      
        if (req.method == 'OPTIONS') {
          res.send(200); /让options请求快速返回/
        }
        else {
          next();
        }
      });

    routes(app, client,cog);

    var server = app.listen(8000, function () {
        console.log('Listening on port http://localhost:8000...');
    });

});


global.filterResult = function(code,msg,data){
    var result = {
        code : code,
        msg:msg,
        result:data
    }
    return result
}

global.filterParams = function(data){
    data.isDelete = false;
    data.createDate = new Date().Format("yyyy-MM-dd");
    data.createTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
    return data;
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}