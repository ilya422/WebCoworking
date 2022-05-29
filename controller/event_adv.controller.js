const db = require('../database/db')

class evAdvController {
    async create_evAdv(req, res) {
        const {name, description, count_member, time_end, img, id_type, id_tag} = req.body
        const id_user_add = req.user.id
        const sql = await db.query(
            `INSERT INTO public.event_advs(
            name, description, count_member, time_end, img, id_type, id_tag, id_user_add)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id`, 
            [name, description, count_member, time_end, img, id_type, id_tag, id_user_add]
        )    

        return res.json(sql.rows[0])
    }
    async get_evAdvs(req, res) {
        const sql = await db.query(
            `SELECT ev.id, ev.name, ev.description,
            ev.count_member, ev.current_member, to_char(DATE(time_end), 'DD-MM-YYYY') as time_end, 
            ev.img, ty.name as type, tg.name as tag, ev.id_user_add, ev.time_add
            FROM public.event_advs as ev
            JOIN types as ty ON ev.id_type = ty.id
            JOIN tags as tg ON ev.id_tag = tg.id`
        )
        res.json(sql.rows)
    }
    async get_evAdvsForMain(req, res) {
        const sql = await db.query(
            `SELECT ev.id, ev.name, ev.description,
            ev.count_member, ev.current_member, to_char(DATE(time_end), 'DD-MM-YYYY') as time_end, time_end as time_sort,
            ev.img, ty.name as type, tg.name as tag, ev.id_user_add, ev.time_add
            FROM public.event_advs as ev
            JOIN types as ty ON ev.id_type = ty.id
            JOIN tags as tg ON ev.id_tag = tg.id
            WHERE current_member < count_member`
        )
        res.json(sql.rows)
    }
    async get_evAdvByUser(req, res) {
        const id_user = req.user.id
        const sql = await db.query(
            `SELECT ev.id, ev.name, ev.description,
            ev.count_member, ev.current_member, to_char(DATE(time_end), 'DD-MM-YYYY') as time_end, 
            ev.img, ty.name as type, tg.name as tag, ev.id_user_add, ev.time_add
            FROM public.event_advs as ev
            JOIN types as ty ON ev.id_type = ty.id
            JOIN tags as tg ON ev.id_tag = tg.id
            WHERE ev.id_user_add = $1`, [id_user]
        )
        res.json(sql.rows)
    }
    async getOne_evAdv(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT ev.id, ev.name, ev.description,
            ev.count_member, ev.current_member, to_char(DATE(time_end), 'DD-MM-YYYY') as time_end, 
            ev.img, ty.name as type, tg.name as tag, tg.id as id_tag, ev.id_user_add, ev.time_add
            FROM public.event_advs as ev
            JOIN types as ty ON ev.id_type = ty.id
            JOIN tags as tg ON ev.id_tag = tg.id
            WHERE ev.id = $1`, [id]
        )
        res.json(sql.rows[0])
    }
    async update_evAdv(req, res) {
        const {id, name, description, count_member, time_end, img, id_tag} = req.body
        const sql = await db.query(
            `UPDATE public.event_advs
            SET name=$1, description=$2, count_member=$3, time_end=$4, img=$5, id_tag=$6
            WHERE id = $7`, [name, description, count_member, time_end, img, id_tag, id]
        )
        res.json('ok')
    }
    async delete_evAdv(req, res) {
        const id = req.body.id
        const sql = await db.query(
            `DELETE FROM public.event_advs
            WHERE id = $1`, [id]
        )
        res.json('ok')
    }

    async delete_evAdv_ByTime(time) {
        const sql = await db.query(
            `DELETE FROM public.event_advs
            WHERE time_end <= $1`, [time]
        )
        return
    }
}
module.exports = new evAdvController()