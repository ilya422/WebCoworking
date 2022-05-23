const db = require('../database/db')

class serAdvController {
    async create_serAdv(req, res) {
        const { name, description, price, img, id_type, id_tag } = req.body
        const id_user_add = req.user.id
        const sql = await db.query(
            `INSERT INTO public.service_advs(
            name, description, price, img, id_type, id_tag, id_user_add)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [name, description, price, img, id_type, id_tag, id_user_add]
        )
        res.json('ok')
    }
    async get_serAdvs(req, res) {
        const sql = await db.query(
            `SELECT ser.id, ser.name, ser.description,
            ser.price, 
            ser.img, ty.name as type, tg.name as tag, ser.id_user_add, ser.time_add
            FROM public.service_advs as ser
            JOIN types as ty ON ser.id_type = ty.id
            JOIN tags as tg ON ser.id_tag = tg.id`
        )
        res.json(sql.rows)
    }
    async getOne_serAdv(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT ser.id, ser.name, ser.description,
            ser.price, u.email,
            ser.img, ty.name as type, tg.name as tag, ser.id_user_add, ser.time_add
            FROM public.service_advs as ser
            JOIN users as u ON ser.id_user_add = u.id
            JOIN types as ty ON ser.id_type = ty.id
            JOIN tags as tg ON ser.id_tag = tg.id
            WHERE ser.id = $1`, [id]
        )
        res.json(sql.rows[0])
    }
    async update_serAdv(req, res) {
        const { id, name, description, price, img, id_type, id_tag } = req.body
        const id_user_add = req.user.id
        const sql = await db.query(
            `UPDATE public.service_advs
            name=$1, description=$2, price=$3, img=$4,
            id_type=$5, id_tag=$6, id_user_add=$7, time_add=$8
            WHERE id = $9`, [name, description, price, img, id_type, id_tag, id_user_add, id]
        )
        res.json('ok')
    }
    async delete_serAdv(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `DELETE FROM public.service_advs
            WHERE id = $1`, [id]
        )
        res.json('ok')
    }
}
module.exports = new serAdvController()