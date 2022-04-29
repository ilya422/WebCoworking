const Router = require('express')
const router = new Router()
const evAdvController = require('../controller/event_adv.controller')

router.post('/api/event_adv', evAdvController.create_evAdv)
router.get('/api/event_adv', evAdvController.get_evAdvs)
router.get('/api/event_adv/:id', evAdvController.getOne_evAdv)
router.put('/api/event_adv/:id', evAdvController.update_evAdv)
router.delete('/api/event_adv/:id', evAdvController.delete_evAdv)

module.exports = router