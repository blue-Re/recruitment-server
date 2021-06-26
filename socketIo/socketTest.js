const {ChatModel} = require('../db/models')

// socket服务端
module.exports = function (serve) {
  const io = require('socket.io')(serve, { cors: true })

  // 监视客户端与服务器的连接
  io.on('connection', function (socket) {
    console.log('有一个客户端连上了服务器')

    // 绑定接听，接收客户端发的消息
    socket.on('client-sendMsg',function ({from,to,content}) {  
      console.log('服务端接收到客户端发的消息',{from,to,content})

      // 处理数据(保存消息)
      // 首先需要准备chatMsg对象的相关数据
      const chat_id = [from,to].sort().join('_')
      const create_time = Date.now()
      new ChatModel({from,to,content,chat_id,create_time}).save((err,chatMsg)=>{
        // 向所有连接上的客户端发消息
        io.emit('serve-sendMsg',chatMsg)
      })
    })
  })
}