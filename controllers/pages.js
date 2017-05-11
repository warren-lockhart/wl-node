module.exports.page = function(req, res)
{
    var page = req.params.page;

    var mongoClient = require('mongodb').MongoClient;

    // The database is called wlnet, the collection is called pages.
    var url = 'mongodb://localhost:27017/wlnet';

    // Connect to the database using this client.
    // TODO: HTTP status codes.
    mongoClient.connect(url).then(function (db) {

        return db.collection("pages").find({page: page}).toArray().then(function (docs) {

            if (!docs.length)
            {
                throw new Error("No documents were returned for page identifier " + page);
            }

            if (docs.length > 1)
            {
                throw new Error("More than one document found for page identifier " + page);
            }

            // The single record is the page document.
            var document = docs[0];

            if (!document)
            {
                throw new Error("The document returned for page indentifer " + page + " is null, undefined or falsey");
            }

            // Construct the view model from the document.
            var viewModel = {
                title: document.title,
                summary: document.summary,
                content: document.content
            };

            db.close();

            // Render the view model into the index view.
            res.render('index', viewModel);
        }).catch(function (err) {
            // Throw any errors back up the promise chain so that the outer catch can handle them.
            throw(err);
        });
    }).catch(function (err) {
        console.error(err.message, err.stack);
        res.render('error', {status: err.status, error: err});
    });
};