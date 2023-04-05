const User = require('../models/user.js')

const loginUser = async (req, res) => {
  const {email,password} = req.body
  const user = await User.findOne({email})
  
 const passValue = await user.comparePassword(password)

  if (!email || !password) {
    throw new Error('Please enter email and password both')
  }

  if(!user){
  throw new Error('This user does not exist in our records please register with us first')}
  
  if(!passValue){
  throw new Error('The password does not match with the users credentials in our records')}
  

  const name = user.getName()
  let token = user.createJWT()
  token = name + '+' + token
  res.send({token})
  
  
}

const registerUser = async (req, res) => {

  const user = await User.create(req.body)
  let token = user.createJWT()
  res.send({token})

}

module.exports = {
  loginUser,
  registerUser
}