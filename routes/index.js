const router = require('express').Router()
const newsRoutes = require('./newsRoutes')
const tagRoutes = require('./tagRoutes')

router.use('/news', newsRoutes)
router.use('/tag', tagRoutes)

module.exports = router