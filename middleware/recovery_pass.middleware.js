const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (req, res, next) {
    if (req.meth === "OPTIONS") {
        next()
    }

    try {
        const token = req.params.token;
        if (!token) {
            return res.json({message: "Токен не найден"});
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        return res.json({e});
    }
}