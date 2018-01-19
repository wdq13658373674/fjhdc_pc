module.exports={
    /**检查cookie并返回user_id**/
    check_Cookie:function(req, res){
        var user_id = req.cookies.user_id;
        if(user_id == undefined){
            res.redirect("/Public/login");
            return false;
        }else {
            return user_id;
        }
    },
    /**检查cookie不返回user_id**/
    is_login:function(req, res){
        var uid=req.cookies.user_id;
        if(uid){
            return true;
        }

        return false;
    },
    /**获取当前时间**/
    now_time:function(time){
        var date = new Date();
        var year = date.getFullYear()
            ,month = date.getMonth()+1
            ,day = date.getDate();
        var hour = date.getHours()
            ,minute = date.getMinutes()
            ,second = date.getSeconds();

        time == false ? time= year + '-' + format(month) + '-' + format(day) : time =  year + '-' + format(month) + '-' + format(day) + ' ' + format(hour) + ":" + format(minute) + ':' + format(second);

        function format(value){
            value=value < 10 ? '0'+value : value;
            return value
        }
        return time;
    }

}