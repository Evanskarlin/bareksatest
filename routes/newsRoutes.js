const router = require('express').Router()
const NewsController = require('../controllers/NewsController')

router.post('/', NewsController.create)
router.get('/', NewsController.readAll)

router.get('/:id', NewsController.readOne)
router.put('/:id', NewsController.updateAll)
router.patch('/:id', NewsController.updateStatus)
router.delete('/:id', NewsController.delete)

module.exports = router