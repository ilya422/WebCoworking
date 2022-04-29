const Router = require('express')
const router = new Router()
const path = require('path');

router.use('/',
    Router.static(path.resolve('public/pages/main')))

router.use('/create_ad',
    Router.static(path.resolve('public/pages/create_ad')))

router.use('/profile/:id',
    Router.static(path.resolve('public/pages/profile')))

router.use('/edit_profile/:id',
    Router.static(path.resolve('public/pages/edit_profile')))

router.route('/public/content/img/*')
    .get((req, res) => {
        res.sendFile(req.url, { root: path.dirname(__dirname) });
});

module.exports = router;