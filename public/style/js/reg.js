/*表单验证*/
var tips=$('.err-tip'),
    errMsg='';
function checkMsg(){
    $('.form .required').each(function(index){
        var self=$(this)
            ,inx=index;

        self.blur(function(){
            self.parents('.input-group').removeClass('error');
            tips.eq(inx).text('');

            if(this.value==''){
                errMsg='不能为空!';
                errTips(errMsg,self);
                return false;
            }else{
                /*电话*/
                if(self.is('#phone') && !modules.is_mobile(this.value)){
                    errMsg='电话号码输入错误!';
                    errTips(errMsg,self);
                    return false;
                }
            }

            /*console.log(errMsg);
            self.parents('.input-group').addClass('success');*/
        });
    })
};

function errTips(errMsg,self){
    self.parents('.input-group').addClass('error').find('.err-tip').text(errMsg);
}
checkMsg();
