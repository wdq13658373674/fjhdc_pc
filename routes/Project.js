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
    /**
     * todo list
     * **/
    var pid=req.query.id;

    data.getModel('project/ProjectDetails',{project_id:pid},function(data){
        console.log(data);
        if(data.code==1){
            var obj={data:data.ret,title: '管理项目详情'};
            res.render('project/detail',obj);
        }else {
            res.send('数据获取：'+data.desc);
        }
    });
});

module.exports = router;
