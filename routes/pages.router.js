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

router.use('/service_edit/:id', authMiddleware,
    Router.static(path.resolve('public/pages/service_edit')))

router.use('/event_edit/:id', authMiddleware,
    Router.static(path.resolve('public/pages/event_edit')))

router.use('/our_events', authMiddleware,
    Router.static(path.resolve('public/pages/our_events')))

router.use('/our_ad', authMiddleware,
    Router.static(path.resolve('public/pages/our_ad')))

router.use('/profile', authMiddleware,
    Router.static(path.resolve('public/pages/profile')))

router.use('/profile_edit', authMiddleware,
    Router.static(path.resolve('public/pages/profile_edit')))

router.use('/login',
    Router.static(path.resolve('public/pages/login')))

router.use('/registration',
    Router.static(path.resolve('public/pages/registration')))

router.route('/public/content/img/*')
    .get((req, res) => {
        res.sendFile(req.url, { root: path.dirname(__dirname) });
    });

module.exports = router;