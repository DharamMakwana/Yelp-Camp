const CampSite = require('../models/campSite.js')

const getAllCampSites = async (req, res) => {
  const data = await CampSite.find({})
  res.send({
    data
  })
}

const getCampSite = async (req, res) => {
  const data = await CampSite.findById(req.params.id)
  res.send(data)
}

const postCampSite = async (req, res) => {
  let {
    name,
    description,
    images,
    price,
    lat,
    long
  } = req.body
  price = parseInt(price)
  const location = [long,
    lat]
  const obj = {
    name,
    description,
    location,
    images,
    price,
    submitedby: req.userInfo.userId
  }
  const campsite = await CampSite.create(obj)
  res.send('created')
}

const addComment = async (req, res) => {
  const {
    id,
    comment
  } = req.body
  const {userName,userId} = req.userInfo
  const obj = {
    comment,
    commentByName: userName,
    commentById: userId
  }
 const updatedData = await CampSite.findByIdAndUpdate(id, {
    $push: {
      "comments": obj
    }}, {
    safe: true, upsert: true, new: true
  })
  res.send(updatedData)

}

const deleteCampSite = async (req, res) => {
  console.log('camp site deleted')
}



module.exports = {
  getAllCampSites,
  getCampSite,
  postCampSite,
  deleteCampSite,
  addComment
}