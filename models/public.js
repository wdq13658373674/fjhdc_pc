module.exports={
    /**检查cookie**/
    is_login:function(req, res){
        var uid=req.session.user;
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