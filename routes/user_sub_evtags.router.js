const Router = require('express')
const router = new Router()
const UserSubEvTagsController = require('../controller/user_sub_evtags.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/api/sub_events_tag', authMiddleware, UserSubEvTagsController.createSub)
router.get('/api/sub_events_tag/user', authMiddleware, UserSubEvTagsController.getSubByUser)
router.get('/api/sub_events_tag/:id_tag', authMiddleware, UserSubEvTagsController.getSubByTag)
router.delete('/api/sub_events_tag', authMiddleware, UserSubEvTagsController.deleteSubByUserTag)

module.exports = router