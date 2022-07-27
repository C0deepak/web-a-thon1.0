const homeController = require('../app/controllers/homeController')
const authController = require('../app/controllers/authController')
const cartController = require('../app/controllers/cartController')
const orderController = require('../app/controllers/orderController')
const adminOrderController = require('../app/controllers/adminOrderController')

function initRoutes(app){
    app.get('/', homeController().index)
    
    app.get('/login', authController().login)
    app.post('/login', authController().postLogin)

    app.get('/register', authController().register)
    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)

    app.post('/orders', orderController().store)

    app.get('/admin', adminOrderController().index)
}

module.exports = initRoutes