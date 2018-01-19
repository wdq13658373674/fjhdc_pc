var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 个人中心-参与项目
 */
router.get('/', function(req, res, next) {
    var uid=req.cookies.user_id//获取cookie

    data.getModel('project_user/index',{
        "uid":uid
    },function(data){
        if(data.code==1){
            var obj={
                data:data.ret,
                title: '个人中心-参与项目',
                menu:"pro"
            }
            res.render('myproject/index.html',obj);
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
