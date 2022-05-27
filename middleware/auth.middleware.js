const jwt = require('jsonwebtoken')
const { secretAccess, secretRefresh } = require('../config')
const tokenController = require('../controller/tokens.controller');

module.exports = async function (req, res, next) {
    if (req.meth === "OPTIONS") {
        next()
    }

    try {
        let access_token = req.cookies.access_token;
        if (!access_token) {
            return res.redirect('/login');
        }

        try {
            let decodedData = jwt.verify(access_token, secretAccess)
            req.user = decodedData
            next()
        }
        catch {
            //Истёк срок access_token
            let tokenRefresh = await tokenController.getRefreshToken(access_token)
            try {
                let decodedRefresh = jwt.verify(tokenRefresh, secretRefresh)
                ref = decodedRefresh
                await tokenController.updateTokens(access_token, res, req)
                let decodedData = jwt.verify(req.cookies.access_token, secretAccess)
                req.user = decodedData
                next()
            }
            catch (err) {
                //Истёк срок refresh_token
                await tokenController.deleteTokens(access_token, res)
                return res.redirect('/login');
            }
        }
    } catch (err) {
        return res.redirect('/login');
    }
}