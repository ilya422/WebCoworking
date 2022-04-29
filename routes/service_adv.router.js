const Router = require('express')
const router = new Router()
const serAdvController = require('../controller/service_adv.controller')

router.post('/api/service_adv', serAdvController.create_serAdv)
router.get('/api/service_adv', serAdvController.get_serAdvs)
router.get('/api/service_adv/:id', serAdvController.getOne_serAdv)
router.put('/api/service_adv/:id', serAdvController.update_serAdv)
router.delete('/api/service_adv/:id', serAdvController.delete_serAdv)

module.exports = router