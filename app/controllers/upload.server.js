
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
                path:'http://localhost:8000' + '/public/uploads'
            }
            var params = global.filterParams(filter);
            col.insertOne(params, function (err, data) {
                if (err) throw err;
                res.send({code:1000, msg:'上传成功',  result:data.ops[0]});
            })
        })
    }

    this.find = function(req,res) {
        col.find({isDelete:false}).toArray(function (err, result){
            if (err) throw err;
            res.send({code:1000,result:result})
        })
    }

    
}

module.exports = upload;