const db = require('../database/db')

class UserSubEventsController {
    async createSub(req, res) {
        const id_user = req.user.id
        const id_event_adv = req.body.id_event_adv
        const current_member = req.body.current_member
        const count_member = req.body.count_member
        if (current_member > count_member) {
            return res.json('Мест нет')
        }
        const sql_create = await db.query(
            `INSERT INTO public.user_sub_event_advs(
            id_user, id_event_adv)
            VALUES ($1, $2)`, [id_user, id_event_adv]
        )
        const sql_update = await db.query(
            `UPDATE public.event_advs
            SET current_member= $1
            WHERE id = $2`, [current_member, id_event_adv]
        )
        res.json('ok')
    }
    async getSubs(req, res) {
        const sql = await db.query(
            `SELECT id_user, id_event_adv
            FROM public.user_sub_event_advs;`
        )
        res.json(sql.rows)
    }
    async getSubByUser(req, res) {
        const id_user = req.user.id
        const sql = await db.query(
            `SELECT ev.id, ev.name, t.name as tag, to_char(DATE(ev.time_end), 'DD-MM-YYYY') as time_end, ev.time_end as time_sort FROM public.user_sub_event_advs as sub
            JOIN public.event_advs as ev ON ev.id = sub.id_event_adv
            JOIN public.tags as t ON ev.id_tag = t.id
            WHERE sub.id_user = $1`, [id_user]
        )
        res.json(sql.rows)
    }
    async getSubByEvent(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT id_user, id_event_adv
            FROM public.user_sub_event_advs
            WHERE id_event_adv = $1`, [id]
        )
        res.json(sql.rows)
    }
    async getSubByUserEvent(req, res) {
        const id_user = req.user.id
        const id_event_adv = req.params.id_event_adv
        const sql = await db.query(
            `SELECT id_user, id_event_adv
            FROM public.user_sub_event_advs
            WHERE (id_user = $1 AND id_event_adv = $2)`, [id_user, id_event_adv]
        )
        res.json(sql.rows)
    }
    async deleteSubByUserEvent(req, res) {
        const id_user = req.user.id
        const id_event_adv = req.body.id_event_adv
        const sql = await db.query(
            `DELETE FROM public.user_sub_event_advs
            WHERE id_user = $1 AND id_event_adv = $2`, [id_user, id_event_adv]
        )
        const sql_update = await db.query(
            `UPDATE public.event_advs
            SET current_member= current_member -1
            WHERE id = $1`, [id_event_adv]
        )
        res.json('ok')
    }
}
module.exports = new UserSubEventsController()