const Router = require('express')
const router = new Router()
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware')

router.use('/',
    Router.static(path.resolve('public/pages/main')))

router.use('/create_ad', authMiddleware,
    Router.static(path.resolve('public/pages/create_ad')))

router.use('/service/:id',
    Router.static(path.resolve('public/pages/service_view')))

router.use('/event/:id',
    Router.static(path.resolve('public/pages/event_view')))

router.use('/profile', authMiddleware,
    Router.static(path.resolve('public/pages/profile')))

router.use('/edit_profile', authMiddleware,
    Router.static(path.resolve('public/pages/edit_profile')))

router.use('/login',
    Router.static(path.resolve('public/pages/login')))

router.use('/registration',
    Router.static(path.resolve('public/pages/registration')))

router.route('/public/content/img/*')
    .get((req, res) => {
        res.sendFile(req.url, { root: path.dirname(__dirname) });
});

module.exports = router;