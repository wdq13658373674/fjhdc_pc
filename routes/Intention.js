var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

//公共方法
var funs=require('./../models/public');

/**
 * 管理项目-意向报名
 */
router.get('/', function(req, res, next) {
    funs.check_Cookie(req, res);
    var pid=req.query.id;

    data.getModel('project/intention',{
        'project_id':pid
    },function(data){
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
 * 管理项目-意向报名-add
 */
router.post('/', function(req, res, next) {
    var datas={
        'uid':req.cookies.user_id,
        'project_id':req.query.id,
        'mean_id':req.body.money
    }

    data.getModel('project/intentionAdd',datas,function(data){
        if(data.code==1){
            res.send({"数据" : data.desc});
        }else {
            res.send({"数据" : data.desc});
        }
    });
});


module.exports = router;
