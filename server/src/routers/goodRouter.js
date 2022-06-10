const Router = require('express')
const router = new Router()
const upload = require("../service/multer")
const goodController = require('../controllers/goodController')
const checkAuth = require('../middleware/authMiddleware');
const checkRole = require("../middleware/authMiddleware")

router.post('/create', upload.single("image"), checkAuth, checkRole, goodController.create)
router.get('/getall', goodController.getAll)
router.get('/:id', goodController.getOne)

module.exports = router