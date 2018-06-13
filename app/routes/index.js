'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');
var Wxuser = require(process.cwd() + '/app/controllers/wxuser.server.js');
var Product = require(process.cwd() + '/app/controllers/product.server.js');
var Upload = require(process.cwd() + '/app/controllers/upload.server.js');
var Specifications = require(process.cwd() + '/app/controllers/specifications.server.js');
var Recommend = require(process.cwd() + '/app/controllers/recommend.server.js');

var NAME_API = '/api';

var multer = require('multer');
var uploadPath = process.cwd() + '/public/uploads';
var storage = multer.diskStorage({ 
    destination: uploadPath,
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+file.originalname.substring(file.originalname.indexOf('.'),file.originalname.length))
    }
})
var multer = multer({
    storage: storage,
    //limits：''//Limits of the uploaded data
}).single('file');
module.exports = function (app, client, cog) {


    app.route('/').get(function (req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
    });

    //事例
    var clickHandler = new ClickHandler(client);
    app.route(NAME_API + '/clicks').post(clickHandler.getClicks);


    var wxuser = new Wxuser(client, cog);
    app.route(NAME_API + '/wx/login').post(wxuser.wxSignIn);
    app.route(NAME_API + '/wx/update').post(wxuser.updateWxuser);

    var product = new Product(client, cog);
    app.route(NAME_API + '/pro/insert').post(product.insert);
    app.route(NAME_API + '/pro/find').post(product.find);
    app.route(NAME_API + '/pro/update').post(product.update);

    var upload = new Upload(client, cog, multer);
    app.route(NAME_API + '/upload/insert').post(upload.insert);
    app.route(NAME_API + '/upload/find').post(upload.find);

    var specifications = new Specifications(client, cog);
    app.route(NAME_API + '/specif/insert').post(specifications.insert);
    app.route(NAME_API + '/specif/find').post(specifications.find);

    var recommend = new Recommend(client, cog);
    app.route(NAME_API + '/rec/insert').post(recommend.insert);
    app.route(NAME_API + '/rec/find').post(recommend.find);
    app.route(NAME_API + '/rec/update').post(recommend.update);
};