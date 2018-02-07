var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 个人中心-参与项目（渲染）
 */
router.get('/', function(req, res, next) {
    var params={
        "uid":req.session.user
    }

    data.getModel('project_user/index',params,function(data){
        if(data.code==1){
            var obj={
                data:data.ret
            }
            res.render('myproject/index.html',obj);
        }else {
            next();
        }
    });
});

/**
 * 参与项目-详情
 */
router.get('/detail', function(req, res, next) {
    /**
     * todo list
     * **/
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            var obj={
                data:data.ret.data
            }
            res.render('myproject/detail.html', obj);
        }else {
            next();
        }
    });
});

/**
 * 参与项目-详情-更多
 */
router.get('/detail_more', function(req, res, next) {
    /**
     * todo list
     * **/
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            var obj={
                data:data.ret.data
            }
            res.render('myproject/detail_more.html', obj);
        }else {
            next();
        }
    });
});


module.exports = router;
