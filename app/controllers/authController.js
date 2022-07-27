const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin' : '/'
    }
    
    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res, next){
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, () => {
                    if(err){
                        req.flash('error', info.message)
                        return next(err) 
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },
        register(req, res) {
            res.render('auth/register')
        },
        async postRegister(req, res){
            const{name, email, regno, password} = req.body

            if( !name || !email || !regno || !password){
                req.flash('error', 'All field required')
                req.flash('name', name)
                req.flash('email', email)

                return res.redirect('/register')
            }

            User.exists({regno: regno}, (err, result) => {
                if(result){
                    req.flash('error', 'Registration Number already taken')
                    req.flash('name', name)
                    req.flash('email', email)

                    return res.redirect('/register')
                }
            })

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = new User({
                name: name,
                email: email, 
                regno: regno,
                password: hashedPassword
            })

            user.save().then((user) => {
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Some thing went wrong')
                return res.redirect('/register')
            })

        },
        logout(req, res) {
            req.logout()
            delete req.session.cart
            return res.redirect('/login')
        }
    }
}

module.exports = authController