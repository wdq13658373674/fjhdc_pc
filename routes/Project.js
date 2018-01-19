var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

//公共方法
var funs=require('./../models/public');

/**
 * 管理项目
 */
router.get('/', function(req, res, next) {
    var flag=funs.is_login(req, res);
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            var obj={
                is_login:flag,
                data:data.ret.data,
                title: '首页'
            };
            res.render('project/index',obj);
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
                title: '管理项目详情'
            };
            res.render('project/detail',obj);
        }else {
            res.send('数据获取：'+data.desc);
        }
    });
});

module.exports = router;
