var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 首页
 */
router.get('/', function(req, res, next) {
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            var obj={
                data:data.ret.data,
                title: '首页',
                menu:"index"
            }

            res.render('index', obj);
        }else {
            next();
        }
    });
});

module.exports = router;
