var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs=require('ejs');

var Index = require('./routes/Index');
var User = require('./routes/User');
var Myproject = require('./routes/Myproject');
var Invite = require('./routes/Invite');
var Project = require('./routes/Project');
var Intention = require('./routes/Intention');
var Public = require('./routes/Public');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('fjhdc'));
app.use(session({
    secret: 'fjhdc',
    resave: true,
    saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));

// 设置模板全局常量
app.locals.servers= {
    imgUrl:'http://res.2.fjhok.com/res/image/'//服务器端图片地址
};
app.use(function(req, res, next) {
    res.locals.is_login = req.session.user;
    next();
});

// 登陆拦截
var prevent_paths = [
    '/User'
    ,'/User/*'
    ,'/Myproject'
    ,'/Myproject/!*'
    ,'/Intention'
    ,'/Intention/!*'
    ,'/Invite'
    ,'/Invite/!*'
];
prevent_paths.forEach(function(items){
    app.all(items,function(req, res, next){
        var user_id=req.session.user;

        if(!user_id){
            res.redirect("/Public/login");
        }else {
            next();
        }
    })
})

app.use('/', Index);
app.use('/User', User);
app.use('/Myproject', Myproject);
app.use('/Invite', Invite);
app.use('/Project', Project);
app.use('/Intention', Intention);
app.use('/Public', Public);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
