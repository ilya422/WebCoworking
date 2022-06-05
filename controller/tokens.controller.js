const db = require('../database/db')
const jwt = require('jsonwebtoken')
const { secretAccess, secretRefresh, secretRecovery } = require('../config')
const userController = require('./user.controller')

const generateAccessToken = (id, role, faculty) => {
    const payload = {
        id,
        role,
        faculty
    }
    return jwt.sign(payload, secretAccess, { expiresIn: "1h" })
}

const generateRefreshToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secretRefresh, { expiresIn: "3d" })
}

const generateRecoveryToken = (id, code) => {
    const payload = {
        id,
        code
    }
    return jwt.sign(payload, secretRecovery, { expiresIn: "10m" })
}



class TokensController {
    async createTokens(id_user, role, faculty, res) {
        let tokenAccess = generateAccessToken(id_user, role, faculty)
        let tokenRefresh = generateRefreshToken(id_user)
        let time_end = new Date(Date.now())
        time_end.setDate(time_end.getDate() + 3);
        
        const sql_tokens = await db.query(
            `INSERT INTO public.tokens(
            id_user, access_token, refresh_token, time_end)
            VALUES ($1, $2, $3, $4)`, [id_user, tokenAccess, tokenRefresh, time_end]
        )

        return res.cookie("access_token", tokenAccess, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
    }

    async getRefreshToken(tokenAccess) {
        const sql_get_tokens = await db.query(
            `SELECT refresh_token
            FROM public.tokens
            WHERE access_token = $1`, [tokenAccess]
        )
        return sql_get_tokens.rows[0].refresh_token
    }

    async updateTokens(tokenAccess, res, req) {
        const sql_get_id_tokens = await db.query(
            `SELECT id, id_user
            FROM public.tokens
            WHERE access_token = $1`, [tokenAccess]
        )
        let id_tokens = sql_get_id_tokens.rows[0].id
        let id_user = sql_get_id_tokens.rows[0].id_user
        let user = await userController.findOneUserByID(id_user)
        user = user[0]

        let new_tokenAccess = generateAccessToken(user.id, user.role, user.faculty)
        let new_tokenRefresh = generateRefreshToken(user.id)
        let new_time_end = new Date(Date.now())
        new_time_end.setDate(new_time_end.getDate() + 3);

        const sql_update_tokens = await db.query(
            `UPDATE public.tokens
            SET access_token=$1, refresh_token=$2, time_end=$3
            WHERE id = $4`, [new_tokenAccess, new_tokenRefresh, new_time_end, id_tokens]
        )

        req.cookies.access_token = new_tokenAccess

        return res.cookie("access_token", new_tokenAccess, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
    }

    async deleteTokens(tokenAccess, res) {
        const sql_delete_tokens = await db.query(
            `DELETE FROM public.tokens
            WHERE access_token = $1`, [tokenAccess]
        )
        res.clearCookie("access_token")
        return 
    }

    async deleteAllUserTokens(id_user, res) {
        const sql_delete_tokens = await db.query(
            `DELETE FROM public.tokens
            WHERE id_user = $1`, [id_user]
        )
        res.clearCookie("access_token")
        return 
    }

    async deleteOldTokens(time) {
        const sql = await db.query(
            `DELETE FROM public.tokens
            WHERE time_end <= $1`, [time]
        )
        return
    }

    createRecoveryToken(id, code) {
        return generateRecoveryToken(id, code)
    }
}
module.exports = new TokensController()