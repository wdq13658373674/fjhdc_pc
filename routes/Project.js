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
                title:'管理项目',
                menu:"pro"
            };
            res.render('project/index',obj);
        }else {
            next();
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
            next();
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
            /**时间戳转换**/
            data.ret.schedule.forEach(function(items){
                var progress_time=items.progress_time;

                items.progress_time=funs.UnixToDate(progress_time,false);
                items.year=items.progress_time.substring(0,4);
                items.month=items.progress_time.substring(5,10);
            })

            var obj={
                is_login:flag,
                data:data.ret,
                title: '管理项目详情',
                menu:"pro",
            };
            res.render('project/detail',obj);
        }else {
            next();
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
            next();
        }
    });
});

module.exports = router;
