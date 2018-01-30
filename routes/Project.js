var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

//common fun
var funs=require('./../models/public');

/**
 * 管理项目
 */
router.get('/', function(req, res, next) {
    var flag=funs.is_login(req, res);
    var page;
    req.body.page ? page=req.body.page : 1;

    data.getModel('project/index/page/'+page,{},function(data){
        if(data.code==1){
            var obj={
                is_login:flag,
                data:data.ret,
                title: '管理项目',
                menu:"pro"
            };
            res.render('project/index',obj);
        }else {
            res.send({code:0,data:data.desc});
        }
    });
});
/**
 * 管理项目-分页请求
 */
router.post('/page_post', function(req, res, next) {
    var page=req.body.page;

    data.getModel('project/index/page/'+page,{},function(data){
        if(data.code==1){
            res.send({code:1,data:data.ret.data});
        }else {
            res.send({code:0,data:data.desc});
        }
    });
});

/**
 * 管理项目-详情
 */
router.get('/detail', function(req, res, next) {
    var flag=funs.is_login(req, res);

    var params={
        project_id:req.query.id
    }

    data.getModel('project/ProjectDetails',params,function(data){
        if(data.code==1){
            var obj={
                is_login:flag,
                data:data.ret,
                title: '管理项目详情',
                menu:"pro"
            };
            res.render('project/detail',obj);
        }else {
            res.send({code:0,data:data.desc});
        }
    });
});

/**
 * 管理项目-建设进度-详情
 */
router.post('/schedule', function(req, res, next) {
    var params={
        pid:req.body.pid,
        project_id:req.body.project_id
    }

    data.getModel('project/schedule',params,function(data){
        if(data.code==1){
            res.send({code:1,data:data.desc});
        }else {
            res.send({code:0,data:data.desc});
        }
    });
});

module.exports = router;
