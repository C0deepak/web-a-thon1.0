const Order = require('../models/order')

function orderController() {
    return{
        store(req, res) {
            const {phone, address} = req.body
            if(!phone || !address){
                req.flash('error', 'All fields required')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })

            order.save().then(result => {
                req.flash('success', 'Order placed succesfully')
                delete req.session.cart
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            })
        } 
    }
}

module.exports = orderController