const Router = require('express')
const router = new Router()
const upload = require("../service/multer")
const goodController = require('../controllers/goodController')


router.post('/create', upload.single("image"), goodController.create)
router.get('/getall', goodController.getAll)
router.get('/:id', goodController.getOne)

module.exports = router