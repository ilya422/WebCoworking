const db = require('../database/db')

class evAdvController {
    async create_evAdv(req, res) {
        const {name, description, count_member, time_end, img, id_type, id_tag, id_user_add} = req.body
        const sql = await db.query(
            `INSERT INTO public.event_advs(
            name, description, count_member, time_end, img, id_type, id_tag, id_user_add)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, 
            [name, description, count_member, time_end, img, id_type, id_tag, id_user_add]
        )
        res.json('ok')
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
    async getOne_evAdv(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT ev.id, ev.name, ev.description,
            ev.count_member, ev.current_member, to_char(DATE(time_end), 'DD-MM-YYYY') as time_end, 
            ev.img, ty.name as type, tg.name as tag, ev.id_user_add, ev.time_add
            FROM public.event_advs as ev
            JOIN types as ty ON ev.id_type = ty.id
            JOIN tags as tg ON ev.id_tag = tg.id
            WHERE ev.id = $1`, [id]
        )
        res.json(sql.rows[0])
    }
    async update_evAdv(req, res) {
        const {id, name, description, count_member, current_member, time_end, img, id_type, id_tag, id_user_add, time_add} = req.body
        const sql = await db.query(
            `UPDATE public.event_advs
            name=$1, description=$2, count_member=$3, current_member=$4, time_end=$5, img=$6,
            id_type=$7, id_tag=$8, id_user_add=$9, time_add=$10
            WHERE id = $11`, [name, description, count_member, current_member, time_end, img, id_type, id_tag, id_user_add, time_add, id]
        )
        res.json('ok')
    }
    async delete_evAdv(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `DELETE FROM public.event_advs
            WHERE id = $1`, [id]
        )
        res.json('ok')
    }
}
module.exports = new evAdvController()