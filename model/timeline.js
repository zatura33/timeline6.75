// define model  Timeline=================


var mongoose = require('mongoose');
Schema = mongoose.Schema;

var timelineSchema = new Schema({
    title: String,
    description : String,
    date_debut: Date,
    date_fin: Date,
    theme: String
});

module.exports = mongoose.model('Timeline', timelineSchema)