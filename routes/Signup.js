var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 管理项目-意向报名
 */
router.get('/', function(req, res, next) {
    /**
     * todo list
     * **/
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            res.render('signup/index', {data:data.ret.data,title: '意向报名'});
        }
    });
});


module.exports = router;
