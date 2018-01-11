var http = require("http");
var querystring=require('querystring');
var Servers=function(){

    /**
     * 数据接口,POST提交
     *
     * @param controller 方法名:写法:控制器名称/方法名称(如:Index/index)
     * @param data 传递参数
     * @param fn  回调函数
     */
    this.getModel=function(controller,data,fn){

        data=data||{};
        var content=querystring.stringify(data);
        var path="/index.php/"+controller;
        var options={
            hostname:'www.dcserver.com',
            port:'80',
            method:'POST',
            path:path,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Content-Length':content.length,
                "appid": "fjhdc",
                "auth-key": "FJHDC2018",
                "user-agent": "FJH_VISITER"
            }
        };
        var req = http.request(options,function(res){
            var _data='';
            res.on('data', function(chunk){
                _data += chunk;
            });
            res.on('end', function(){
                fn!=undefined && fn(_data);
            });
        });
        req.write(content);
        req.end();
    };

};

module.exports=Servers;