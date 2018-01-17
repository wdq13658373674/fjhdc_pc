var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 首页
 */
router.get('/', function(req, res, next) {
    data.getModel('Project/index',{},function(data){
       /* console.log(data);
        console.log(data.ret);*/

        var obj={
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
