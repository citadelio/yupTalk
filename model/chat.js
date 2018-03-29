var mongo = require('mongodb');
var mongoose = require('mongoose');

//var db = mongoose.connect('mongodb://localhost/sayIT');
var db = mongoose.connect('mongodb://citadel:jakande@ds157818.mlab.com:57818/heroku_s3r4xhfg');

db.connection;
var Schema = mongoose.Schema;

var chatschema = new Schema({
	name:{
		type:String,
		required:true
	},
	image:{
		type:String,
	},
	message:{
		type:String,
		required:true
	},
	time:{
		type:String
	}
});

var Chat = module.exports = mongoose.model('chat', chatschema);