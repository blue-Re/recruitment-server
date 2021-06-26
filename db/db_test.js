/* 测试使用mongoose操作mongodb数据库 */

// 引入md5
const md5 = require('blueimp-md5')

// 1. 连接数据库
// 1.1 引入mongoose
const mongoose = require('mongoose')
// 1.2 连接指定数据库
mongoose.connect('mongodb://localhost:27017/xinyuan_recruitment')
// 1.3 获取连接对象
const conn = mongoose.connection
// 1.4 绑定连接完成的监听
conn.on('connected', () => {
  console.log('数据库连接成功...');
})
// 2.得到对应特定集合的Model
// 2.1 定义Schema（描述文档结构）
const userSchema = mongoose.Schema({
  username: { type: String, required: true }, // 用户名 
  password: { type: String, required: true }, // 密码 
  type: { type: String, required: true },// 用户类型: dashen/laoban 
})
// 2.2 定义Model（与集合对应，可以操作集合）
const UserModel = mongoose.model('user', userSchema) // 集合名: users

// 3.通过Model或其实例对集合数据进行 CRUD
// 3.1. 通过 Model 实例的 save()添加数据
function testSave() {
  // 创建UserModel的实例
  const userModel = new UserModel({ username: 'tom', password: md5('123'), type: 'dashen' })
  // 调用save保存
  userModel.save((err, user) => {
    console.log('save', err, user);
  })
}
// testSave()

// 3.2. 通过 Model 的 find()/findOne()查询多个或一个数据 
function testFind() { // 查找多个 
  UserModel.find(function (err, users) { // 如果有匹配返回的是一个[user, user..], 如果 没有一个匹配的返回[] 
    console.log('find() ', err, users)
  })
  // 查找一个 :如果 有匹配返回的是一个 user, 如果没有一个匹配的返回 null
  UserModel.findOne({ _id: '60d1e900747ef23db836dd0c' }, function (err, user) {
    console.log('findOne() ', err, user)
  })
}
// testFind()

// 3.3 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {  
  UserModel.findByIdAndUpdate({_id:'60d1e900747ef23db836dd0c'},{username:'jack'},(err,oldUser)=>{
    console.log('findByIdAndUpdate',err,oldUser);
  })
}
// testUpdate()

// 3.4 通过Model的remove() 删除匹配的数据
function testDelete() {  
  UserModel.remove({_id:'60d1e900747ef23db836dd0c'},(err,doc)=>{
    console.log('remove',err,doc);
  })
}
// testDelete()