var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 管理项目-意向报名（页面渲染）
 */
router.get('/', function(req, res, next) {
    var params={
        'project_id':req.query.id
    }

    data.getModel('project/intention',params,function(data){
        if(data.code==1){
            var obj={
                project:data.ret.project,
                amount:data.ret.project_mean
                ,title: '意向报名'
            }
            res.render('intention/index', obj);
        }else {
            res.send({"数据" : data.desc});
        }
    });
});

/**
 * 管理项目-意向报名（报名提交）
 */
router.post('/', function(req, res, next) {
    var params={
        'uid':req.cookies.user_id,
        'project_id':req.query.id,
        'mean_id':req.body.money
    }

    data.getModel('project/intentionAdd',params,function(data){
        if(data.code==1){
            res.send({"数据" : data.desc});
        }else {
            res.send({"数据" : data.desc});
        }
    });
});


module.exports = router;
