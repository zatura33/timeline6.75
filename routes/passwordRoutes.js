

module.exports=function(app) {

    var Connexion="pas connecté";

    app.post('/api/password', function (req, res) {

        if("epoque49admin"==req.body.username && "285749l32"==req.body.password){
            Connexion="est connecté                        .";
        }
        else
        {
            Connexion="pas connecté";

        }
            res.end();

        });

    app.get('/api/password', function (req, res) {
        res.send(Connexion);
    });




};