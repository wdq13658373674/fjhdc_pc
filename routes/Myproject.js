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
    var params={
        project_id:req.query.id,
        pid:0
    }
    data.getModel('sell/index',params,function(data){
        if(data.code==1){
            var obj={
                data:data.ret
            }
            res.render('myproject/detail.html', obj);
        }else {
            next();
        }
    });
});

router.post('/detail_post', function(req, res, next) {
   var params={
       pid:req.body.pid,
       project_id:req.body.project_id
   }
    data.getModel('sell/getMenuChlild',params,function(data){
        // console.log(data.ret[0].fore);

        if(data.code==1){
            res.send({
                code:1,
                data:data.ret
            })
        }else {
            next();
        }
    });
});



/**
 * 参与项目-详情-更多
 */
router.get('/detail_more', function(req, res, next) {
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
