const Router = require('express')
const { v4 } = require("uuid")
const router = new Router()
const goodRouter = require('./goodRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require("./basketRouter")

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/good', goodRouter)
router.use('/basket', basketRouter)

module.exports = router  