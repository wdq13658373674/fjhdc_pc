var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 跳转页面
 */
router.get('/jump', function(req, res, next) {
    res.render('public/jump', { title:'系统跳转' });
});


/**
 * 注册
 */
router.get('/reg', function(req, res, next) {
    res.render('public/register', { title:'注册' });
});

router.post('/reg_post',function (req,res) {
    var datas={
        "mobile":req.body.phone,
        "password":req.body.password,
        "rpassword":req.body.repassword,
        "verification":req.body.code
    }

    data.getModel('user_register/register',datas,function(data){
        if(data.code==1 && data.errcode==0){
            var uid = data.ret;
            res.cookie("user_id",uid);//设置cookie
            res.redirect("/User");
        }else{
            res.send({"code":0,"msg":data.desc});
        }
    });
});


/**
 * 获取验证码
 * */
router.post('/sendVerify',function (req,res) {
     var datas={
        'mobile' : req.body.phone
        ,'type':req.body.type
     }

    data.getModel('user_member/sendVerify',datas,function(data){
        console.log(data);
        if(data.code==1){
            res.send({"code":1,"msg":data.desc});
        }else{
            res.send({"code":0,"msg":data.desc});
        }
    });
});

/**
 * 登陆
 */
router.get('/login', function(req, res, next) {
    res.clearCookie('user_id');//清除cookie
    res.render('public/login', { title:'登陆' });
});

router.post('/login_post', function(req, res, next) {
    var datas={
        "mobile":req.body.phone,
        "password":req.body.password,
    }

    data.getModel('user_login/login',datas,function(data){
        if(data.code==1 && data.errcode==0){
            var uid = data.ret;
            res.cookie("user_id",uid);//设置cookie
            res.redirect("/User");
        }else{
            res.send({"code":0,"msg":"no"});
        }
    });
});

module.exports = router;
