const Router = require('express')
const router = new Router()
const typeController = require('../controller/type.controller')
const authMiddleware = require('../middleware/auth.middleware')

// router.post('/api/type', typeController.createType)
router.get('/api/type', typeController.getTypes)
router.get('/api/type/create_ad', authMiddleware, typeController.getTypesForCreateAd)
router.get('/api/type/:id', typeController.getOneType)
// router.put('/api/type/:id', typeController.updateType)
// router.delete('/api/type/:id', typeController.deleteType)

module.exports = router