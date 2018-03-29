$(function(){
    var socket = io();
    var form = $('#msg-form');
    var sendBtn = $('#sendbtn');
    var msgArea = $('#main-area');
    //var errorAvail = $('#errorAvail');
    var welcomeForm = $('#welcomeForm');
    var exitBtn = $('#exitbtn');
    // var welcometext = $('#welcometext').val();
  // var mBox = $('#msg-box');
   var typinStatus = $('.typingStatus');

   $('.msg-box').keydown(function(e){
     var welcometext2 = $('#welcometext').val();
    socket.emit('typing', welcometext2);
   })

socket.on('showTyping', function(user){
    typinStatus.html('<p><i>' + user +' is typing...</i></p>');
})
    socket.on('output', function(data){
         var welcometext = $('#welcometext').val();
    //console.log('new data just arrives'+ data);
    for(var i = 0; i < data.length; i++){
        if(welcometext == data[i].name){
           typinStatus.html('');
 msgArea.append('<div class="single-msg me"><div class="msg-icon right">\
                            <img src="images/'+data[i].image+'" class="image responsive-img circle"></div>\
                            <div class="msg-text right card darken-1"><div class="card-content">\
                            <p>' + data[i].message + '</p></div>\
                            <div class="card-action"><span class="left"><i>@'+ data[i].name+'</i></span>\
                            <span class="right"><small class="left" style="padding:0 0 10px 0">'+data[i].time+'</small>\
                             <i class="material-icons right">check</i><div class="clearfix"></div> </span>\
                <div class="clearfix"></div> \
                            </div></div></div><div class="clearfix"></div>')  
        }else{ 
           typinStatus.html('');
          msgArea.append('<div class="single-msg others "><div class="msg-icon left">\
                            <img src="images/'+data[i].image+'" class="image responsive-img circle"></div>\
                            <div class="msg-text left card darken-1"><div class="card-content">\
                            <p>' + data[i].message + '</p></div>\
                            <div class="card-action"><span class="left"><i>@'+ data[i].name+'</i></span>\
                            <span class="right"><small class="left" style="padding:0 0 10px 0">'+data[i].time+'</small>\
                             <i class="material-icons right">check</i><div class="clearfix"></div> </span>\
                <div class="clearfix"></div> \
                            </div></div></div><div class="clearfix"></div>')                                             
    }}

});

    form.submit(function(e){
        e.preventDefault();
         var msgBox = $('.msg-box');
        var msg = msgBox.val();
        var welcometext = $('#welcometext').val();
        var iconImage = $('input[name=iconImage]:checked').val();

        if(e.which == 13 && e.shiftKey){
            return false
        }else{
            if(msg == ''){
              Materialize.toast('You didnt type a message', 5000);
                msgBox.val('').focus();
                return false;
            }else {
                Materialize.toast('Message Sent!', 1500);
                e.preventDefault();
                 $('.msg-box').val('').focus();
                 var date= new Date();
                 var month = date.getMonth() + 1;
                 var time = date.getDate()+'/'+ month +' '+' '+ date.getHours()+':'+date.getMinutes();
                socket.emit('input', {name:welcometext, message:msg, image:iconImage, time:time});
       }}
    })


socket.on('noUser', function(){
                  Materialize.toast('Welcome!', 3000);
                                    console.log('welcome');
                   $('#welcomebody').hide();
    $('.container.main').fadeIn(200);
    $('body').css("background-color","#fdeaeb");
       $('.msg-box').val('').focus();
})


socket.on('userFound', function(){
                  Materialize.toast('This Username already exist', 10000);
                  console.log('exist');
                  return false;
})
    
$('#continuebtn').click(function(e){
             var welcometext = $('#welcometext').val();
            var iconImage = $('input[name=iconImage]:checked').val();
             if(welcometext == ''){
                Materialize.toast('Please choose a Username', 10000);
             }else if(iconImage == null){
            Materialize.toast('Please choose an avatar', 10000);
             }else{
    e.preventDefault();
    socket.emit('checkUser', {user:welcometext})
}
})
});