// define model  Timeline=================


var mongoose = require('mongoose');
Schema = mongoose.Schema;

var timenoteSchema = new Schema({
    timeline_name:String,
    title: String,
    description : String,
    date_debut: Date,
    date_fin: Date,
    theme: String
});

module.exports = mongoose.model('Timenote', timenoteSchema)