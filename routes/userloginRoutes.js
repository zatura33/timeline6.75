// routes ======================================================================

var mongoose = require('mongoose')
var Userlogin=mongoose.model('Userlogin',[]);


module.exports=function(app) {
// api ---------------------------------------------------------------------
// get all userlogins
    app.get('/api/userlogins', function (req, res) {

        // use mongoose to get all userlogins in the database
        Userlogin.find(function (err, userlogins) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(userlogins); // return all userlogins in JSON format
        });
    });

// create userlogins and send back all userlogins after creation
    app.post('/api/userlogins', function (req, res) {

        // create a userlogins, information comes from AJAX request from Angular
        Userlogin.create({
            username: req.body.username,
            password:req.body.password,
            done: false,
        }, function (err, userlogin) {
            if (err)
                res.send(err);

            // get and return all the userlogins after you create another
            Userlogin.find(function (err, userlogins) {
                if (err)
                    res.send(err)
                res.json(userlogins);
            });
        });

    });

// delete a userlogin
    app.delete('/api/userlogins/:userlogin_id', function (req, res) {
        Userlogin.remove({
            _id: req.params.userlogin_id
        }, function (err, userlogin) {
            if (err)
                res.send(err);

            // get and return all the userlogins after you create another
            Userlogin.find(function (err, userlogins) {
                if (err)
                    res.send(err)
                res.json(userlogins);
            });
        });
    });

}