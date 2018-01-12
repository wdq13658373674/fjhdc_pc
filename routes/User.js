var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 个人中心
 */
router.get('/', function(req, res, next) {
    /**
     * todo list
     * **/
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            res.render('user/index', {data:data.ret.data,title: '意向报名'});
        }
    });
});

/**
 * 个人中心-个人资料
 */
router.get('/message', function(req, res, next) {
    /**
     * todo list
     * **/
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            res.render('user/message', {data:data.ret.data,title: '意向报名'});
        }
    });
});

module.exports = router;
