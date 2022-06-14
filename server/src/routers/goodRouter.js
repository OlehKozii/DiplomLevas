const Router = require('express')
const router = new Router()
const upload = require("../service/multer")
const goodController = require('../controllers/goodController')
const checkAuth = require('../middleware/authMiddleware');
const checkRole = require("../middleware/authMiddleware")

router.post('/create', upload.single("image"), goodController.create)
router.get('/getall', goodController.getAll)
router.get('/getone/:id', goodController.getOne)
router.post('/addComment/:id', goodController.addComment)
router.post('/addType', goodController.addType)
router.delete('/:id', goodController.deleteProduct)
router.put('/:id', checkAuth, goodController.edit)

module.exports = router