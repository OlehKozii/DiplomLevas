const Router = require('express')
const router = new Router()
const check = require('../middleware/authMiddleware');
const basketController = require('../controllers/basketController')

router.post('/add', check, basketController.add)
router.post('/remove', check, basketController.remove)
router.post('/removeall', check, basketController.removeall)
router.get('/get', check, basketController.get)

module.exports = router