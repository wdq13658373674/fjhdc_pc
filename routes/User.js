var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

//公共方法
var funs=require('./../models/public');

/**
 * 个人中心
 */
router.get('/', function(req, res, next) {
    var uid=funs.check_Cookie(req, res);

    data.getModel('user_member/index',{
        "uid":uid
    },function(data){
        data.ret.last_login_time == '1970-01-01 08:00:00' ? data.ret.last_login_time = funs.now_time(true) : data.ret.last_login_time=data.ret.last_login_time;

        if(data.code==1){
            var obj={
                // last_time:last_time,
                data:data.ret,
                title: '个人中心',
                menu:"index"
            }
            res.render('User/index',obj);
        }else {
            res.send('数据获取：'+data.desc);
        }
    });
});

/**
 * 个人中心-个人资料
 */
router.get('/message', function(req, res, next) {
    var uid=funs.check_Cookie(req, res);

    data.getModel('user_member/index',{
        "uid":uid
    },function(data){
        if(data.code==1 && data.errcode==0){
            var obj={
                data:data.ret,
                title: '个人资料',
                menu:"msg"
            }
            res.render('user/message', obj);
        }else {
            res.send('数据获取：'+data.desc);
        }
    });

});
/**
 * 个人中心-个人资料 post
 */
router.post('/message',function(req, res, next){
    var uid=funs.check_Cookie(req, res)
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
            res.send({"code":1,"msg":"yes"});
        }else {
            res.send({"code":0,"msg":"no"});
        }
    });
})

module.exports = router;
