const jwt = require('jsonwebtoken')
const {secretRecovery} = require('../config')

module.exports = function (req, res, next) {
    if (req.meth === "OPTIONS") {
        next()
    }

    try {
        const token = req.params.token;
        if (!token) {
            res.json({message: "Токен не найден"})
            return res.redirect('/login');;
        }
        const decodedData = jwt.verify(token, secretRecovery)
        req.user = decodedData
        next()
    } catch (e) {
        return res.redirect('/login');;
    }
}