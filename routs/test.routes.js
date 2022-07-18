const Router = require('express')

const router = new Router()
const testController = require('../controller/test.controller')

router.post('/item', testController.createItem)
router.get('/item', testController.findAllItems)
router.get('/item/:id', testController.findItemById)
router.put('/item', testController.updateItem)
router.delete('/item/:id', testController.deleteItem)

module.exports = router