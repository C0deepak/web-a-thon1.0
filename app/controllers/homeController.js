const Menu = require('../models/menu')

function homeController() {
    return {
        async index(req, res) {
            const menu = await Menu.find()
            return res.render('home', { menu: menu })
        }

    }
}

module.exports = homeController