var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expr1esssds' });
});

router.get('/test', function(req, res, next) {

});

module.exports = router;
