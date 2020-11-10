const router = require('express').Router()
const Controller = require('../controllers/controller')

const shirtRouter = require('./shirt')

// -> /
router.get('/', Controller.getViewAllShirts) // Redirecting to home (from) /shirts

// -> /shirts
router.use('/shirts', shirtRouter)

module.exports = router