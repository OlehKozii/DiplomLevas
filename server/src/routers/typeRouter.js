const Router = require('express')
const checkAuth = require('../middleware/authMiddleware');
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')




router.post('/create', checkAuth, checkRole, typeController.create)
router.get('/getAll', typeController.getAll)

module.exports = router