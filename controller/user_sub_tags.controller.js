const db = require('../database/db')

class UserSubTagsController {
    async createSub(req, res) {
        const id_user = req.user.id
        const id_tag = req.body.id_event_adv
        const sql = await db.query(
            `INSERT INTO public.user_sub_tags(
            id_user, id_tag)
            VALUES ($1, $2)`, [id_user, id_tag]
        )
        res.json('ok')
    }
    // async getSubs(req, res) {
    //     const sql = await db.query(
    //         `SELECT id_user, id_tag
    //         FROM public.user_sub_tags;`
    //     )
    //     res.json(sql.rows)
    // }
    async getSubByUser(req, res) {
        const id_user = req.user.id
        const sql = await db.query(
            `SELECT id_user, id_tag
            FROM public.user_sub_tags
            WHERE id_user = $1`, [id_user]
        )
        res.json(sql.rows)
    }
    async deleteSubByUserTag(req, res) {
        const id_user = req.user.id
        const id_tag = req.body.id_tag
        const sql = await db.query(
            `DELETE FROM public.user_sub_tags
            WHERE id_user = $1 AND id_tag = $2`, [id_user, id_tag]
        )
        res.json('ok')
    }
}
module.exports = new UserSubTagsController()