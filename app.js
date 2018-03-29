var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Chat = require('./model/chat');
//var db = mongoose.connect('mongodb://localhost/sayIT');
var db = mongoose.connect('mongodb://citadel:jakande@ds157818.mlab.com:57818/heroku_s3r4xhfg');
//mongodb://<dbuser>:<dbpassword>@ds157818.mlab.com:57818/heroku_s3r4xhfg
db.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
//var onlineUsers = [];
//var usernames = ['ade','kola'];
io.on('connection', function(socket){
    console.log('a new user has connected with id of '+ socket.id);

Chat.find({}, function(err, data){
    if(err) throw err;
    socket.emit('output', data);
})

socket.on('input', function(data){
    var newchat = new Chat({
    name:data.name,
     image:data.image, 
     message:data.message,
     time:data.time
 })
    newchat.save();
      io.emit('output', [data] );
})



socket.on('checkUser', function(user){
    Chat.find({name:user.user}, function(err, data){
        if(err) throw err;
        console.log(data.length);
        if(data.length > 0){
            socket.emit('userFound');
        }else{
            socket.emit('noUser');
        }
    });
})

socket.on('typing', function(user){
    socket.broadcast.emit('showTyping',user);
})

});


app.get('/', function (req,res,next) {
    res.render('chatroom');
});
http.listen(process.env.PORT || 8080, function(){
 console.log('Server running...');
});