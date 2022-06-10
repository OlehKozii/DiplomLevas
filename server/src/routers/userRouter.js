const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
// const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/createArticle', userController.createArticle)
router.post('/deleteArticle', userController.deleteArticle)
// router.get('/auth'/*, authMiddleware*/, userController.check)

module.exports = router