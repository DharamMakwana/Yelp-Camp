const http = require('http-status-codes')

const errorMiddleware = function(err, req, res, next){

  const customErrorObj = {
    message: err.message,
    statusCode: err.status || 500
  }

  if (err.code === 11000) {
    customErrorObj.message = `User already exist with ${err.keyValue.email}`
    customErrorObj.statusCode = http.BAD_REQUEST
  }


  res.status(customErrorObj.statusCode).send(customErrorObj)
}

module.exports = errorMiddleware