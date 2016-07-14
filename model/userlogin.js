// define model  userlogin=================


var mongoose = require('mongoose');
Schema = mongoose.Schema;

var userloginSchema = new Schema({
    username: String,
    password : String,

});

module.exports = mongoose.model('Userlogin', userloginSchema)