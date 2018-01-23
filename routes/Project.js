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

    data.getModel('project/index/page/1',{},function(data){
        if(data.code==1){
            var obj={
                is_login:flag,
                data:data.ret,
                title: '管理项目',
                menu:"pro"
            };
            res.render('project/index',obj);
        }
    });
});

router.post('/', function(req, res, next) {
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
        console.log(data.ret);
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


module.exports = router;
