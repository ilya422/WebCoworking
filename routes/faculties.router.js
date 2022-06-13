const Router = require('express')
const router = new Router()
const facultController = require('../controller/faculties.controller')
const authMiddleware = require('../middleware/auth.middleware')

// router.post('/api/tag', typeController.createTag)
router.get('/api/faculty', facultController.getFacult)
router.get('/api/faculty/adv', authMiddleware, facultController.getFacultForAdv)
router.get('/api/faculty/:id', facultController.getOneFacult)
// router.put('/api/tag/:id', typeController.updateTag)
// router.delete('/api/tag/:id', typeController.deleteTag)

module.exports = router