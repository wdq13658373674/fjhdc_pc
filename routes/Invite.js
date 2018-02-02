var express = require('express');
var router = express.Router();

var Model=require('./../models/servers');
var data=new Model();

/**
 * 个人中心-推荐客户（渲染）
 */
router.get('/', function(req, res, next) {
    var params={
        "uid":req.session.user
    }

    data.getModel('agent_invite/index',params,function(data){
        console.log(data.ret);
        if(data.code==1){
            var num=data.ret.length;
            if(num!=0){
                data.ret.forEach(function(items,index){
                    if(items.status==-1){
                        num-- ;
                    }
                });
            }

            var obj={
                num:num,
                data:data.ret,
                title: '推荐客户',
                menu:"recom"
            }
            res.render('invite/index',obj);
        }else {
            res.send('数据返回'+data.desc);
        }
    });
});

/**
 * 个人中心-推荐客户（添加）
 */
router.post('/invite_add', function(req, res, next) {
    var uid=req.session.user//获取cookie
        ,phone=req.body.phone
        ,realname=req.body.realname

    var params={
        "uid":uid,
        "mobile":phone,
        "invite_real_name":realname
    }

    data.getModel('agent_invite/inviteAdd',params,function(data){
        if(data.code==1 && data.errcode==0){
            res.send({code:1,msg:data.desc});
        }else {
            res.send({code:0,msg:data.desc});
        }
    });
});

/**
 * 个人中心-推荐客户（编辑）
 */
router.post('/invite_update', function(req, res, next) {
    var uid=req.session.user//获取cookie
        ,phone=req.body.phone
        ,realname=req.body.realname
        ,id=req.body.id

    var params={
        "id":id,
        "user_id":uid,
        "mobile":phone,
        "invite_real_name":realname
    }

    data.getModel('agent_invite/inviteEdit',params,function(data){
        if(data.code==1 && data.errcode==0){
            res.send({code:1,msg:data.desc});
        }else {
            res.send({code:0,msg:data.desc});
        }
    });
});

/**
 * 个人中心-推荐客户（删除）
 */
router.post('/invite_del', function(req, res, next) {
    var params={
        id:req.body.id
    }

    data.getModel('agent_invite/inviteDel',params,function(data){
        if(data.code==1){
            res.send({"code":1,"msg":data.desc});
        }else {
            console.log(data);
            res.send({"code":0,"msg":data.desc});
        }
    });
});

module.exports = router;
