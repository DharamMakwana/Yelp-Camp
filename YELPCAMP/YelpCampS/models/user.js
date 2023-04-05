const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true,'Please provide name']
  },
  email:{
    type: String,
    required: [true,'Please provide email address'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide valid email'],
    unique: true
  },
  password: {
    type: String,
    required: [true,'Please provide password'],
    minlength:6
  }
})
userSchema.pre('save',async function(next){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
  next()
})
userSchema.methods.comparePassword = async function (reqPass) {
  const passValue = await bcrypt.compare(reqPass,this.password)
  return passValue
}
userSchema.methods.createJWT = function(){
 return jwt.sign({USER_ID:this._id,USER_NAME:this.name},process.env.JWT_SECRET,{
   expiresIn: '30d'
 })
}
userSchema.methods.getName = function(){
  return this.name
}
module.exports = mongoose.model('User',userSchema)