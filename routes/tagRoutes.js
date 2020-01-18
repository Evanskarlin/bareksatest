const router = require('express').Router()
const TagController = require('../controllers/TagController')

router.post('/', TagController.create)
router.get('/', TagController.readAll)

router.get('/:id', TagController.readOne)
router.patch('/:id', TagController.update)
router.delete('/:id', TagController.delete)

module.exports = router