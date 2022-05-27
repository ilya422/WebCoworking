const Router = require('express')
const router = new Router()
const UserSubTagsController = require('../controller/user_sub_tags.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/api/sub_events', authMiddleware, UserSubTagsController.createSub)
router.get('/api/sub_events/user', authMiddleware, UserSubTagsController.getSubByUser)
router.delete('/api/sub_events', authMiddleware, UserSubTagsController.deleteSubByUserTag)

module.exports = router