var express = require('express');
var pages = require('./controllers/pages');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome to the Home Page' });
});

/* GET articles page. */
router.get('/articles', function(req, res, next) {
    res.render('index', { title: 'Articles' });
});

/* GET a page. */
router.get('/:page', pages.page);

module.exports = router;