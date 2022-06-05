const db = require('../database/db')

class UserSubEvTagsController {
    async createSub(req, res) {
        const id_user = req.user.id
        const id_tag = req.body.id_tag
        const sql = await db.query(
            `INSERT INTO public.user_sub_evtags(
            id_user, id_tag)
            VALUES ($1, $2)`, [id_user, id_tag]
        )
        res.json('ok')
    }
    async getSubByUser(req, res) {
        const id_user = req.user.id
        const sql = await db.query(
            `SELECT sub.id_user, sub.id_tag, t.name
            FROM public.user_sub_evtags as sub
            JOIN public.tags as t ON t.id = sub.id_tag 
            WHERE id_user = $1`, [id_user]
        )
        res.json(sql.rows)
    }
    async getSubByTag(req, res) {
        const id_tag = req.params.id_tag
        const id_faculty = req.params.id_faculty
        const sql = await db.query(
            `SELECT sub.id_user, u.email, u.id_faculty, sub.id_tag, t.name as tag_name, 
            FROM public.user_sub_evtags as sub
            JOIN public.tags as t ON t.id = sub.id_tag
			JOIN public.users as u ON u.id = sub.id_user
            WHERE id_tag = $1 AND (u.id_faculty = $2 OR $2 = 1)`, [id_tag, id_faculty]
        )
        return res.json(sql.rows)
    }
    async deleteSubByUserTag(req, res) {
        const id_user = req.user.id
        const id_tag = req.body.id_tag
        const sql = await db.query(
            `DELETE FROM public.user_sub_evtags
            WHERE id_user = $1 AND id_tag = $2`, [id_user, id_tag]
        )
        res.json('ok')
    }
}
module.exports = new UserSubEvTagsController()