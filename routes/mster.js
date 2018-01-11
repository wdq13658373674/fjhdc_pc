
var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();


/* GET home page. */
router.get('/',function(req, res, next) {

    data.getModel('Index/index',{msg:101},function(data){
        console.log(data);
        res.render('index/list', { title:data });
    });


});


module.exports = router;
