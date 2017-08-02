const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

module.exports.page = function(req, res) {
    const page = req.params.page;

    const mongoClient = require('mongodb').MongoClient;

    // The database is called wlnet, the collection is called pages.
    const url = 'mongodb://localhost:27017/wlnet';

    // Connect to the database using this client.
    // TODO: HTTP status codes.
    mongoClient.connect(url).then(function (db) {

        return db.collection("pages").find({page: page}).toArray().then(function (docs) {

            if (!docs.length)
            {
                // TODO: return 404 view.
                throw new Error("No documents were returned for page identifier " + page);
            }

            if (docs.length > 1)
            {
                throw new Error("More than one document found for page identifier " + page);
            }

            // The single record is the page document.
            const document = docs[0];

            if (!document)
            {
                throw new Error("The document returned for page indentifer " + page + " is null, undefined or falsey");
            }

            // Construct the view model from the document.
            const viewModel = {
                title: document.title,
                summary: document.summary,
                content: document.content,
                date: document.date
            };

            db.close();

            // Render the view model into the index view.
            return res.render('index', viewModel);

        }).catch(function (err) {
            // Throw any errors back up the promise chain so that the outer catch can handle them.
            throw(err);
        });
    }).catch(function (err) {
        console.error(err.message, err.stack);
        return res.render('error', {status: err.status, error: err});
    });
};

module.exports.new = function(req, res) {
    res.render('new');
}

module.exports.create = function(req, res) {

    if (!req.body.page || !req.body.title)
    {
        // Send the existing form values and a message to the view.
        const viewModel = {
            message: "The page and title fields must be populated to create a new page",
            page: req.body.page,
            title: req.body.title,
            summary: req.body.summary,
            content: req.body.content
        };

        return res.render('new', viewModel);
    }

    const dateNow = new Date();

    const viewModel = {
        page: req.body.page,
        title: req.body.title,
        year: dateNow.getFullYear(),
        month: monthNames[dateNow.getMonth()],
        day: dateNow.getDate()
    };

    return res.render('created', viewModel);
}