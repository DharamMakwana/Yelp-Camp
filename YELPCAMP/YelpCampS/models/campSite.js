const mongoose = require('mongoose')
const CampSiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name of the Campsite']
  },
  description: {
    type: String,
    Default: 'A nice place to visit alone or with your family'
  },
  location: {
    type: [Number],
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  comments: {
    type: [{
      comment: {
        type:String,
        default:''
      },
      commentByName: {
        type: String,
        default: ''
      },
      commentById: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
      }}],
    },
    price: {
      type: Number,
      required: true
    },
    submitedby: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  })
  
module.exports = mongoose.model('CampSite',CampSiteSchema)