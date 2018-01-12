var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 管理项目
 */
router.get('/', function(req, res, next) {
    /**
     * todo list
     * **/
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            res.render('project/index', {data:data.ret.data,title: '首页'});
        }
    });
});

/**
 * 管理项目-详情
 */
router.get('/detail', function(req, res, next) {
    var pid=req.query.id;

    /**
     * todo list
     * **/
    data.getModel('Project/index',{id:pid},function(data){
        if(data.code==1){
            res.render('project/detail', {data:data.ret.data,title: '管理项目详情'});
        }
    });
});

module.exports = router;
