const Router = require('express')
const router = new Router()
const checkAuth = require('../middleware/authMiddleware');
const basketController = require('../controllers/basketController')

router.post('/add', checkAuth, basketController.add)
router.delete('/:id', checkAuth, basketController.remove)
router.post('/removeall', checkAuth, basketController.removeall)
router.get('/get', checkAuth, basketController.get)

module.exports = router