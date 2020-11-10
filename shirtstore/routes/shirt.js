const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.redirectToHome)

router.get('/add', Controller.getAddShirtForm) // GET /shirts/add

router.post('/add', Controller.postAddShirtForm) // POST /shirts/add

router.get('/edit/:id', Controller.getEditShirtByIdForm) // GET /shirts/edit/:id

router.post('/edit/:id', Controller.postEditShirtByIdForm) // POST /shirts/edit/:id

router.get('/delete/:id', Controller.getDeleteShirtById) // GET /shirts/delete/:id

module.exports = router