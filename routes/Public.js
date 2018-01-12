var express = require('express');
var router = express.Router();
var app = express();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 跳转页面
 */
router.get('/', function(req, res, next) {
    res.render('public/jump', { title:'系统跳转' });
});


/**
 * 注册
 */
router.get('/reg', function(req, res, next) {
    res.render('public/register', { title:'注册' });
});

router.post('/reg_post',function (req,res) {//HTTP 请求,返回的HTTP响应
    var phone=req.body.phone
        ,pwd=req.body.password
        ,repwd=req.body.repassword
        ,code=req.body.code;
    // 输出 JSON 格式
    var response = {
        "phone":phone,
        "pwd":pwd,
        "repwd":repwd,
        "code":code
    };
    var datas=JSON.stringify(response);
    res.send(datas);

    /**
     * todo list
     * */
    /*data.getModel('Index/index',datas,function(data){
        if(data.code!=1){
            // res.send(data.desc);
        }else{
            req.session.userInfos = {name:result.username,sign:true};
            res.redirect("/User");
        }
    });*/
});

/**
 * 登陆
 */
router.get('/login', function(req, res, next) {
    res.render('public/login', { title:'登陆' });
});

router.post('/login', function(req, res, next) {
    var phone=req.body.phone
        ,pwd=req.body.password
    // 输出 JSON 格式
    var response = {
        "phone":phone,
        "pwd":pwd
    };
    var datas=JSON.stringify(response);

    /**
    * todo list
    * */
    data.getModel('Index/index',datas,function(data){
        if(data.code!=1){
            res.send(data.desc);
        }else{

        }
    });
});

module.exports = router;
