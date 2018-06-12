'use strict';


function upload (client, cog,multer) {
    var col = client.db(cog.dbName).collection('uploads');
    var log = client.db(cog.dbName).collection('operationLog');

    this.insert = function (req,res) {
        multer(req,res,function(err){
            if (err) throw err;
            var filter = {
                fileName:req.file.filename,
                mimetype:req.file.mimetype,
                size:req.file.size,
                path:process.cwd() + '/public/uploads'
            }
            var params = global.filterParams(filter);
            var pa = global.filterParams(fl);
            log.insertOne(fl,function(err,data){})
            col.insertOne(params, function (err, data) {
                if (err) throw err;
                res.send({code:1000, msg:'上传成功',  result:data.ops[0]});
                client.close();
            })
        })
    }

    this.find = function(req,res) {
        col.find({}).limit(2).skip(1).toArray(function (err, result){
            res.send({code:1000,result:result})
            client.close();
        })
    }
}

module.exports = upload;