var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

//公共方法
var funs=require('./../models/public');

/**
 * 首页
 */
router.get('/', function(req, res, next) {
    var flag=funs.is_login(req, res);
    console.log(flag);

    data.getModel('Project/index',{},function(data){
        var obj={
            is_login:flag,
            data:data.ret.data,
            title: '首页',
            menu:"pro"
        }

        if(data.code==1){
            res.render('index', obj);
        }else {
            res.send('数据获取：'+data.desc);
        }
    });
});

module.exports = router;
