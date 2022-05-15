const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (req, res, next) {
    if (req.meth === "OPTIONS") {
        next()
    }

    try {
        if (req.user.role == "Расширенный" || req.user.role == "Администратор") {
            next()
        }
        else {
            return res.json({message: "Недостаточная роль"})
        }
    } catch (e) {
        return res.json({e});
    }
}