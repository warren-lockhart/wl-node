module.exports.page = function(req, res)
{
    var page = req.params.page;
    res.render('index', { title: page });
};