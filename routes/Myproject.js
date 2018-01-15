var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 个人中心-参与项目
 */
router.get('/', function(req, res, next) {
    /**
     * todo list
     * **/
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            res.render('myproject/index.html', {data:data.ret.data,title: '个人中心-参与项目'});
        }
    });
});

/**
 * 我的项目-详情
 */
router.get('/detail', function(req, res, next) {
    /**
     * todo list
     * **/
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            res.render('myproject/detail.html', {data:data.ret.data,title: '个人中心-我的项目-详情'});
        }
    });
});

/**
 * 我的项目-详情-更多
 */
router.get('/detail_more', function(req, res, next) {
    /**
     * todo list
     * **/
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            res.render('myproject/detail_more.html', {data:data.ret.data,title: '销售详情'});
        }
    });
});


module.exports = router;