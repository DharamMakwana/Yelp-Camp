const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('You are not authorised to access this path')
  }
  const token = authHeader.split(' ')[1]
  try {
   const payload = jwt.verify(token,process.env.JWT_SECRET)
   req.userInfo = {
     userId: payload.USER_ID,
     userName: payload.USER_NAME
   }
   next();
  } catch (e) {
    
   throw new Error('Token has tampered please login again')
  }
}

module.exports = authMiddleware