var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

//common fun
var funs=require('./../models/public');

/**
 * 个人中心（渲染）
 */
router.get('/', function(req, res, next) {
    var params={
        "uid":req.session.user
    }
    data.getModel('user_member/index',params,function(data){
        data.ret.last_login_time == '1970-01-01 08:00:00' ? data.ret.last_login_time = funs.now_time(true) : data.ret.last_login_time=data.ret.last_login_time;

        if(data.code==1){
            var obj={
                data:data.ret,
                title: '个人中心',
                menu:"index"
            }
            res.render('User/index',obj);
        }else {
            next();
        }
    });
});

/**
 * 个人中心-个人资料（渲染）
 */
router.get('/message', function(req, res, next) {
    var params={
        "uid":req.session.user
    }

    data.getModel('user_member/index',params,function(data){
        if(data.code==1){
            if(data.ret.birthday == null){
                data.ret.birthday=funs.now_time(false);
            }
            var obj={
                data:data.ret,
                title: '个人资料',
                menu:"msg"
            }
            res.render('user/message', obj);
        }else {
            next();
        }
    });

});
/**
 * 个人中心-个人资料 (修改)
 */
router.post('/message_update',function(req, res, next){
    var uid=req.session.user
        ,nickname=req.body.nickname
        ,sex=parseInt(req.body.sex)
        ,birthday=req.body.birthday
        ,address=req.body.address;

    var datas={
        "uid":uid,
        "nickname":nickname,
        "sex":sex,
        "birthday":birthday,
        "address":address
    }

    data.getModel('user_member/PersonalAdd',datas,function(data){
        if(data.code==1){
            res.send({code:1,msg:data.desc});
        }else {
            res.send({code:0,msg:data.desc});
        }
    });
})

module.exports = router;
