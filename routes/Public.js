var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();
//common fun
var funs=require('./../models/public');

/**
 * 注册（页面渲染）
 */
router.get('/reg', function(req, res, next) {
    res.render('public/register');
});
/**
 * 注册（提交）
 */
router.post('/reg_post',function (req,res) {
    var params={
        "mobile":req.body.phone,
        "password":req.body.password,
        "rpassword":req.body.repassword,
        "verification":req.body.code
    }

    data.getModel('user_register/register',params,function(data){
        if(data.code==1 && data.errcode==0){
            var uid = data.ret;
            req.session.user=uid;//设置session

            res.send({"code":1,"msg":data.desc});
        }else{
            res.send({"code":0,"msg":data.desc});
        }
    });
});


/**
 * 获取验证码
 * */
router.post('/sendVerify',function (req,res) {
     var params={
        'mobile' : req.body.phone
        ,'type':req.body.type
     }

    data.getModel('user_member/sendVerify',params,function(data){
        var code_num=data.ret.content.slice(21,27);
        if(data.code==1){
            res.send({"code":1,"msg":data.desc,code_num:code_num});
        }else{
            res.send({"code":0,"msg":data.desc});
        }
    });
});

/**
 * 登陆
 */
router.get('/login', function(req, res, next) {
    res.render('public/login');
});
/**
 * 登陆（提交）
 */
router.post('/login_post', function(req, res, next) {
    var params={
        "mobile":req.body.phone,
        "password":req.body.password,
    }

    data.getModel('user_login/login',params,function(data){
        if(data.code==1 && data.errcode==0){
            var uid = data.ret;
            req.session.user=uid;//设置session
            res.send({"code":1,"msg":data.desc});
        }else{
            res.send({"code":0,"msg":data.desc});
        }
    });
});

/**
 * 清空缓存
 * */
router.get('/exit',function(req,res,next){
   //清除session
    req.session.destroy(function(err){
        if(err){
            next();
        }else{
            res.redirect('back');
        }
    })
})

/**
 * 跳转页面
 */
router.get('/jump', function(req, res, next) {
    var obj={
        'msg':'系统跳转',
    }
    res.render('public/jump',obj);
});

/**
 * 跳转页面
 */
router.get('/rule', function(req, res, next) {
    res.render('public/regRule');
});

module.exports = router;
