'use strict';

var http = require('request')

function wxuser(client, cog) {

    var col = client.db(cog.dbName).collection('wxuser');
    var log = client.db(cog.dbName).collection('operationLog');

    var filterEntity = function (data) {
        var filter = {}
        filter.telNumber = data['telNumber'];
        filter.password = data['password'];
        filter.status = data['status'];
        return filter
    }

    /**
     * 微信登陆
     * @param {js_code} code码
     */
    this.wxSignIn = function (req, res) {
        http.get(cog.WX_API + 'jscode2session?appid=' + cog.APP_ID + '&secret=' + cog.APP_SECRET + '&js_code=' + req.body['js_code'] + '&grant_type=authorization_code', function (error, response, body) {
            var wxs = JSON.parse(body)
            wxs.describe = '微信登陆';
            wxs.data = 'js_code='+ req.body['js_code']
            log.insertOne(global.filterParams(wxs), function (err, data) {
                if (err) throw err;
            })
            col.find({ openid: wxs.openid }).toArray(function (err, result) {
                if (err) throw err;
                if (result) {
                    if (result.length == 0) {
                        var filter = {openid:wxs.openid}
                        var params = global.filterParams(filter);
                        col.insertOne(params, function (err, data) {
                            if (err) throw err;
                            res.json(global.filterResult(1000, '注册成功',  data.ops[0]));
                            client.close();
                        });
                    }else{
                        res.send({code:1000,result:result[0]})
                        client.close();
                    }
                }
            })
        })

    }

    /**
     * 更新微信用户
     * @param {nickName,avatarUrl,province,city,gender} 
     */
    this.updateWxuser = function(req, res){
        var filter = {
            avatarUrl:req.body.avatarUrl,
            nickName:req.body.nickName,
            gender:req.body.gender,
            province:req.body.province,
            city:req.body.city
        }
        log.insertOne(global.filterParams({openid:req.body.openid,describe:'更新微信用户',data:JSON.stringify(filter)}), function (err, data) {
            if (err) throw err;
            client.close();
        })
        col.updateOne({openid:req.body.openid},{$set:filter},function(err,data){
            if (err) throw err;
            col.find({openid:req.body.openid}).toArray(function(err,data){
                if (err) throw err;
                res.send({code:1000,msg:'更新成功', result:data[0]})
                client.close();
            })
            
        })
    }

}
module.exports = wxuser;