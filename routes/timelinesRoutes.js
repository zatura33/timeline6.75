// routes ======================================================================

var mongoose = require('mongoose')
var Timeline=mongoose.model('Timeline',[]);


module.exports=function(app) {
// api ---------------------------------------------------------------------
// get all timelines
    app.get('/api/timelines', function (req, res) {

        // use mongoose to get all timelines in the database
        Timeline.find(function (err, timelines) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(timelines); // return all timelines in JSON format
        });
    });

// create timeline and send back all timelines after creation
    app.post('/api/timelines', function (req, res) {

        // create a timeline, information comes from AJAX request from Angular
        Timeline.create({
            title: req.body.title,
            date_debut:req.body.date_debut,
            date_fin:req.body.date_fin,
            theme:req.body.theme,
            description:req.body.description,
            done: false,
        }, function (err, timeline) {
            if (err)
                res.send(err);

            // get and return all the timelines after you create another
            Timeline.find(function (err, timelines) {
                if (err)
                    res.send(err)
                res.json(timelines);
            });
        });

    });

// delete a timeline
    app.delete('/api/timelines/:timeline_id', function (req, res) {
        Timeline.remove({
            _id: req.params.timeline_id
        }, function (err, timeline) {
            if (err)
                res.send(err);

            // get and return all the timelines after you create another
            Timeline.find(function (err, timelines) {
                if (err)
                    res.send(err)
                res.json(timelines);
            });
        });
    });

}