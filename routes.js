var express = require('express');
var pages = require('./controllers/pages');

var router = express.Router();

// Note: the order of these route declarations matters.
// The generic page route should be tried last.

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome to the Home Page' });
});

/* GET articles page. */
router.get('/articles', function(req, res, next) {
    res.render('index', { title: 'Articles' });
});

/* GET the page creator */
router.get('/new-page', pages.new);

/* POST a new page */
router.post('/new-page', pages.create);

/* GET a page. */
router.get('/:page', pages.page);


module.exports = router;