var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 个人中心-推荐客户
 */
router.get('/', function(req, res, next) {
    /**
     * todo list
     * **/
    data.getModel('Project/index',{},function(data){
        if(data.code==1){
            res.render('invite/index', {data:data.ret.data,title: '推荐客户'});
        }
    });
});

module.exports = router;
