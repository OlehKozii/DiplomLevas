const Router = require('express')
const { v4 } = require("uuid")
const router = new Router()
const goodRouter = require('./goodRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require("./basketRouter")

router.use('/api/user', userRouter)
router.use('/api/type', typeRouter)
router.use('/api/brand', brandRouter)
router.use('/api/good', goodRouter)
router.use('/api/basket', basketRouter)

module.exports = router  