var socket = io("http://localhost:3000");
socket.on("server-send-fail", function(){
  alert("Register fail, username has been exist");
});

socket.on("server-send-list-user", function(data){
  $("#contentBox").html("");
  data.forEach(function(i){
    $("#contentBox").append("<div class='user'>"+i+"</div");
  });
});

socket.on("server-send-succesful", function(data){
  $("#loginForm").hide(2000);
  $("#chatForm").show(1000);
  $("#currentUser").html(data);
});
socket.on("server-send-message", function(data){
  $("#listMessage").append("<div class='message'>"+ data.user+": "+data.content+"</div>");
});
$(document).ready(function(){
  $("#loginForm").show();
  $("#chatForm").hide();

  //click register
  $("#btnRegister").click(function(){
    socket.emit("client-send-Username", $("#txtUsername").val());

  });

$("#logOut").click(function(){
  socket.emit("client-send-logOut");
  $("#loginForm").show(2000);
  $("#chatForm").hide(1000);
});
$("#btnSendMessage").click(function(){
  socket.emit("user-send-message", $("#txtMessage").val());
});

});
