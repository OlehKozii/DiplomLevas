const Router = require('express')
const check = require('../middleware/authMiddleware');
const router = new Router()
const typeController = require('../controllers/typeController')
// const checkRole = require('../middleware/checkRoleMiddleware')





router.post('/create'/*, checkRole('ADMIN')*/, check, typeController.create)
router.get('/getAll', typeController.getAll)

module.exports = router