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
    },
    /**
     * 时间戳转换日期
     * @param unixTime  待时间戳(秒)
     * @param isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
     * @param timeZone  时区
     */
    UnixToDate: function(unixTime, isFull, timeZone) {
        if (typeof (timeZone) == 'number')
        {
            unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
        }
        var time = new Date(unixTime * 1000);
        var ymdhis = "";
        ymdhis += format(time.getUTCFullYear()) + "-";
        ymdhis += (format(time.getUTCMonth()+1)) + "-";
        ymdhis += format(time.getUTCDate());
        if (isFull === true)
        {
            ymdhis += " " + time.getUTCHours() + ":";
            ymdhis += time.getUTCMinutes() + ":";
            ymdhis += time.getUTCSeconds();
        }
        function format(value){
            value=value < 10 ? '0'+value : value;
            return value
        }
        return ymdhis;
    }

}