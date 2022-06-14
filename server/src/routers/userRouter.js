const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const checkAuth = require('../middleware/authMiddleware');
const checkRole = require("../middleware/authMiddleware")

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/setRole/:id', userController.setRole)
router.delete('/deleteUser/:id', userController.deleteUser)
router.get('/allUsers', checkAuth, checkRole, userController.getAllUsers)

router.post('/createArticle', checkAuth, checkRole, userController.createArticle)
router.put('/editarticle/:id', checkAuth, checkRole, userController.editArticle)
router.get('/articles', userController.getArticles)
router.get('/article/:id', userController.getArticle)
router.delete('/deleteArticle/:id', checkAuth, checkRole, userController.deleteArticle)

router.post('/createOrder', checkAuth, userController.createOrder)
router.get("/getAllOrders", checkAuth, checkRole, userController.getAllOrders)
router.put("/setOrderState/:id", checkAuth, checkRole, userController.setOrderState)
// router.get('/auth'/*, authMiddleware*/, userController.check)

module.exports = router