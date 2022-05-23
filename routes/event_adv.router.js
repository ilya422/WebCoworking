const Router = require('express')
const router = new Router()
const evAdvController = require('../controller/event_adv.controller')
const authMiddleware = require('../middleware/auth.middleware')
const extendedRoleMiddlewate = require('../middleware/extended_role.middleware')

router.post('/api/event_adv', authMiddleware, extendedRoleMiddlewate, evAdvController.create_evAdv)
router.get('/api/event_adv', evAdvController.get_evAdvsForMain)
router.get('/api/event_adv/:id', evAdvController.getOne_evAdv)
router.put('/api/event_adv/:id', authMiddleware, extendedRoleMiddlewate, evAdvController.update_evAdv)
router.delete('/api/event_adv/:id', authMiddleware, extendedRoleMiddlewate, evAdvController.delete_evAdv)

module.exports = router