const db = require('../database/db')
const bcrypt = require('bcryptjs');

class RegCodeController {
    async createCode(req, res) {
        const email = req.body.email
        let code = ""
        var possible = "0123456789";
        for (var i = 0; i < 6; i++)
            code += possible.charAt(Math.floor(Math.random() * possible.length));
        const hashCode = bcrypt.hashSync(code, 7)
        var time_end = new Date();
        time_end.setMinutes(time_end.getMinutes() + 10);
        const sql = await db.query(
            `INSERT INTO public.registration_codes as t(
            email, code, time_end)
            VALUES ($1, $2, $3)

            ON CONFLICT (email) DO UPDATE 
            SET code = $2, time_end = $3 
            WHERE t.email = $1
            `, [email, hashCode, time_end]
        )
        return res.json({code: code})
    }

    async getCode(email) {
        const sql = await db.query(
            `SELECT email, code, time_end
            FROM public.registration_codes
            WHERE email = $1`, [email]
        )
        return sql.rows
    }

    async deleteCode(email) {
        const sql = await db.query(
            `DELETE FROM public.registration_codes
            WHERE email = $1`, [email]
        )
        return
    }

    async deleteOldRegCode(time) {
        const sql = await db.query(
            `DELETE FROM public.registration_codes
            WHERE time_end = $1`, [time]
        )
        return
    }
}

module.exports = new RegCodeController()