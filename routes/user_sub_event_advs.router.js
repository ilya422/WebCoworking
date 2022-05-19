const Router = require('express')
const router = new Router()
const UserSubEventsController = require('../controller/user_sub_event_advs.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/api/sub_events', authMiddleware, UserSubEventsController.createSub)
router.get('/api/sub_events/user/:id', authMiddleware, UserSubEventsController.getSubByUser)
router.get('/api/sub_events/adv/:id', authMiddleware, UserSubEventsController.getSubByEvent)
router.get('/api/sub_events/user_adv/:id_event_adv', authMiddleware, UserSubEventsController.getSubByUserEvent)
router.delete('/api/sub_events/', authMiddleware, UserSubEventsController.deleteSubByUserEvent)

module.exports = router