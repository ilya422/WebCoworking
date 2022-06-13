const db = require('../database/db')

class evAdvController {
    async create_evAdv(req, res) {
        const { name, description, count_member, time_end, img, id_type, id_tag, id_faculty } = req.body
        const id_user_add = req.user.id
        const sql = await db.query(
            `INSERT INTO public.event_advs(
            name, description, count_member, time_end, img, id_type, id_tag, id_faculty, id_user_add)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id`,
            [name, description, count_member, time_end, img, id_type, id_tag, id_faculty, id_user_add]
        )

        return res.json(sql.rows[0])
    }
    async get_evAdvs(req, res) {
        const sql = await db.query(
            `SELECT ev.id, ev.name, ev.description,
            ev.count_member, ev.current_member, to_char(DATE(time_end), 'DD-MM-YYYY') as time_end, 
            ev.img, ty.name as type, tg.name as tag, f.name as faculty, ev.id_user_add, ev.time_add
            FROM public.event_advs as ev
            JOIN types as ty ON ev.id_type = ty.id
            JOIN tags as tg ON ev.id_tag = tg.id
            JOIN public.faculties as f ON id_faculty = f.id`

        )
        res.json(sql.rows)
    }
    async get_evAdvsForMain(req, res) {
        // const page = req.params.page
        // const page = 1
        // const itemsPerPage = 9
        const faculty = req.user.faculty
        const sql = await db.query(
            `SELECT ev.id, ev.name, ev.description,
            ev.count_member, ev.current_member, to_char(DATE(time_end), 'DD-MM-YYYY') as time_end, 
            ev.img, ty.name as type, tg.name as tag, f.name as faculty, ev.id_user_add, ev.time_add
            FROM public.event_advs as ev
            JOIN types as ty ON ev.id_type = ty.id
            JOIN tags as tg ON ev.id_tag = tg.id
            JOIN public.faculties as f ON id_faculty = f.id
            WHERE current_member < count_member AND (f.name=$1 OR f.name = 'Все' OR $1 = 'Все' )`, [faculty]
            // LIMIT ${itemsPerPage} OFFSET (${page} - 1) * ${itemsPerPage}`
        )
        res.json(sql.rows)
    }
    async get_evAdvByTag(req, res) {
        const faculty = req.user.faculty
        const id_tag = req.params.id_tag
        const sql = await db.query(
            `SELECT ev.id, ev.name, ev.description,
            ev.count_member, ev.current_member, to_char(DATE(time_end), 'DD-MM-YYYY') as time_end, 
            ev.img, ty.name as type, tg.name as tag, f.name as faculty, ev.id_user_add, ev.time_add
            FROM public.event_advs as ev
            JOIN types as ty ON ev.id_type = ty.id
            JOIN tags as tg ON ev.id_tag = tg.id
            JOIN public.faculties as f ON id_faculty = f.id
            WHERE current_member < count_member AND tg.id = $1 AND (f.name=$2 OR f.name = 'Все' OR $2 = 'Все')`, [id_tag, faculty]
        )
        res.json(sql.rows)
    }
    async get_evAdvByUser(req, res) {
        const id_user = req.user.id
        const sql = await db.query(
            `SELECT ev.id, ev.name, ev.description,
            ev.count_member, ev.current_member, to_char(DATE(time_end), 'DD-MM-YYYY') as time_end, 
            ev.img, ty.name as type, tg.name as tag, f.name as faculty, ev.id_user_add, ev.time_add
            FROM public.event_advs as ev
            JOIN types as ty ON ev.id_type = ty.id
            JOIN tags as tg ON ev.id_tag = tg.id
            JOIN public.faculties as f ON id_faculty = f.id
            WHERE ev.id_user_add = $1`, [id_user]
        )
        res.json(sql.rows)
    }
    async getOne_evAdv(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT ev.id, ev.name, ev.description,
            ev.count_member, ev.current_member, to_char(DATE(time_end), 'DD-MM-YYYY') as time_end, 
            ev.img, ty.name as type, tg.id as id_tag, tg.name as tag, f.id as id_faculty, f.name as faculty, ev.id_user_add, ev.time_add
            FROM public.event_advs as ev
            JOIN types as ty ON ev.id_type = ty.id
            JOIN tags as tg ON ev.id_tag = tg.id
            JOIN public.faculties as f ON id_faculty = f.id
            WHERE ev.id = $1`, [id]
        )
        res.json(sql.rows[0])
    }
    async getFacultyAdv(req) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT f.id as id_faculty, f.name as faculty
            FROM public.event_advs as ev
            JOIN public.faculties as f ON id_faculty = f.id
            WHERE ev.id = $1`, [id]
        )
        return sql.rows[0]
    }
    async update_evAdv(req, res) {
        const { id, name, description, count_member, time_end, img, id_tag, id_faculty } = req.body
        const sql = await db.query(
            `UPDATE public.event_advs
            SET name=$1, description=$2, count_member=$3, time_end=$4, img=$5, id_tag=$6, id_faculty =$7
            WHERE id = $8`, [name, description, count_member, time_end, img, id_tag, id_faculty, id]
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