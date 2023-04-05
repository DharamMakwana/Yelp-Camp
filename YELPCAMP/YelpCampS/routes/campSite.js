const express = require('express')
const router = express.Router()
const {getAllCampSites,getCampSite,postCampSite,deleteCampSite,addComment} = require('../controllers/campSite.js')

const authMiddleware = require('../middleware/authMiddleware.js')

router.route('/')
.post(authMiddleware,postCampSite)
.get(getAllCampSites)

router.route('/:id')
.get(authMiddleware,getCampSite)
.delete(authMiddleware,deleteCampSite)
.patch(authMiddleware,addComment)

module.exports = router