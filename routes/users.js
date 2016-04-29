var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 路由
router.get('/getWeek', function(req, res, next) {
    res.json({
        type: 'week',
        value: Math.random()
    });
});
module.exports = router;
