var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 管理项目-意向报名（渲染）
 */
router.get('/', function(req, res, next) {
    var params={
        'uid':req.session.user,
        'project_id':req.query.id
    }

    data.getModel('project/intention',params,function(data){
        if(data.code==1){
            var obj={
                project:data.ret.project,
                amount:data.ret.project_mean
            }
            res.render('intention/index', obj);
        }else {
            var obj={
                'msg':'你已参与此项目，即将跳转到个人中心参与项目',
            }
            res.render('public/jump', obj);
        }
    });
});

/**
 * 管理项目-意向报名（报名）
 */
router.post('/', function(req, res, next) {
    var params={
        'uid':req.session.user,
        'project_id':req.query.id,
        'mean_id':req.body.money
    }

    data.getModel('project/intentionAdd',params,function(data){
        if(data.code==1){
            var obj={
                'msg':'参与成功，工作人员将在24小时内与您联系',
            }
            res.render('public/jump', obj);
        }else {
            // res.send({code:0,msg:data.desc});
            next();
        }
    });
});


module.exports = router;
