var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var arrUser = [];

io.on("connection", function(socket){
console.log("connected "+socket.id);
socket.on("client-send-Username", function(data){
  if(arrUser.indexOf(data)>=0){
    //emit register failure
    socket.emit("server-send-fail");
  }
  else{
    arrUser.push(data);
    socket.username = data;
    // emit register succesful
    socket.emit("server-send-succesful", data);
    io.sockets.emit("server-send-list-user",arrUser);
  }
});
socket.on("client-send-logOut", function(){
  arrUser.splice(arrUser.indexOf(socket.username),1);
  socket.broadcast.emit("server-send-list-user",arrUser);
});
socket.on("user-send-message", function(data){
  io.sockets.emit("server-send-message", {user:socket.username, content:data});
});
});
app.get("/", function(req, res){
  res.render("home")
})
