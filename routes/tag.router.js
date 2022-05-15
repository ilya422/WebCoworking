const Router = require('express')
const router = new Router()
const typeController = require('../controller/tag.controller')

// router.post('/api/tag', typeController.createTag)
router.get('/api/tag', typeController.getTags)
router.get('/api/tag/:id', typeController.getOneTag)
// router.put('/api/tag/:id', typeController.updateTag)
// router.delete('/api/tag/:id', typeController.deleteTag)

module.exports = router