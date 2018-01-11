
var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();


/* GET home page. */
router.get('/',function(req, res, next) {

    data.getModel('Index/index',{msg:10000},function(data){
        console.log(data);
        res.render('index/list', { title:data });
    });


});

router.get('/test', function(req, res, next) {
    res.render('index/list', { title:"test" });
});


module.exports = router;
