module.exports = function (server) {
  // 得到 IO 对象
  const io = require('socket.io')(server, { cors: true })
  // 监视连接(当有一个客户连接上时回调)
  io.on('connection', function (socket) {
    console.log('soketio connected')
    // 绑定 sendMsg 监听, 接收客户端发送的消息
    socket.on('sendMsg', function (data) {
      console.log('服务器接收到浏览器的消息', data)
      // 向客户端发送消息(名称, 数据)
      io.emit('receiveMsg', data.name + '_' + data.date)  // 发送给所有连接上服务端的客户端
      // io.emit('receiveMsg', data.name + '_' + data.date) // 发送给当前socket对应的客户端
      console.log('服务器向浏览器发送消息', data)
    })
  })
}