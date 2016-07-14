// routes ======================================================================

var mongoose = require('mongoose');
var Timenote=mongoose.model('Timenote',[]);


module.exports=function(app) {
// api ---------------------------------------------------------------------
// get all timenotes
    app.get('/api/timenotes', function (req, res) {

        // use mongoose to get all timenotes in the database
        Timenote.find(function (err, timenotes) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(timenotes); // return all timenotes in JSON format
        });
    });

// create timenote and send back all timenotes after creation
    app.post('/api/timenotes', function (req, res) {

        // create a timenote, information comes from AJAX request from Angular
        Timenote.create({
            timeline_name:req.body.timelinename,
            title: req.body.title,
            date_debut:req.body.date_debut,
            date_fin:req.body.date_fin,
            theme:req.body.theme,
            description:req.body.description,
            done: false,
        }, function (err, timenote) {
            if (err)
                res.send(err);

            // get and return all the timenotes after you create another
            Timenote.find(function (err, timenotes) {
                if (err)
                    res.send(err)
                res.json(timenotes);
            });
        });

    });

// delete a timenote
    app.delete('/api/timenotes/:timenote_id', function (req, res) {
        Timenote.remove({
            _id: req.params.timenote_id
        }, function (err, timenote) {
            if (err)
                res.send(err);

            // get and return all the timenotes after you create another
            Timenote.find(function (err, timenotes) {
                if (err)
                    res.send(err)
                res.json(timenotes);
            });
        });
    });

}