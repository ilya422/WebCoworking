const Router = require('express')
const router = new Router()
const path = require('path');
const authMiddleware = require('../middleware/auth.middleware')

router.use('/',
    Router.static(path.resolve('public/pages/main')))

router.use('/create_ad',
    Router.static(path.resolve('public/pages/create_ad')))

// router.use('/profile/:id', authMiddleware,
//     Router.static(path.resolve('public/pages/profile')))
router.use('/profile/:id',
    Router.static(path.resolve('public/pages/profile')))

router.use('/edit_profile/:id',
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