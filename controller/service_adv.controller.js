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
        // const page = req.params.page
        // const page = 1
        // const itemsPerPage = 9
        const sql = await db.query(
            `SELECT ser.id, ser.name, ser.description,
            ser.price, 
            ser.img, ty.name as type, tg.name as tag, ser.id_user_add, ser.time_add
            FROM public.service_advs as ser
            JOIN types as ty ON ser.id_type = ty.id
            JOIN tags as tg ON ser.id_tag = tg.id`
            // LIMIT ${itemsPerPage} OFFSET (${page} - 1) * ${itemsPerPage}`
        )
        res.json(sql.rows)
    }
    async get_serAdvByUser(req, res) {
        const id_user = req.user.id
        const sql = await db.query(
            `SELECT ser.id, ser.name, ser.description,
            ser.price, 
            ser.img, ty.name as type, tg.name as tag, ser.id_user_add, ser.time_add
            FROM public.service_advs as ser
            JOIN types as ty ON ser.id_type = ty.id
            JOIN tags as tg ON ser.id_tag = tg.id
            WHERE ser.id_user_add = $1`, [id_user]
        )
        res.json(sql.rows)
    }
    async getOne_serAdv(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT ser.id, ser.name, ser.description,
            ser.price, u.email,
            ser.img, ty.name as type, tg.name as tag, tg.id as id_tag, ser.id_user_add, ser.time_add
            FROM public.service_advs as ser
            JOIN users as u ON ser.id_user_add = u.id
            JOIN types as ty ON ser.id_type = ty.id
            JOIN tags as tg ON ser.id_tag = tg.id
            WHERE ser.id = $1`, [id]
        )
        res.json(sql.rows[0])
    }
    async update_serAdv(req, res) {
        const { id, name, description, price, img, id_tag } = req.body
        const sql = await db.query(
            `UPDATE public.service_advs
            SET name=$1, description=$2, price=$3, img=$4, id_tag=$5
            WHERE id = $6`, [name, description, price, img, id_tag, id]
        )
        res.json('ok')
    }
    async delete_serAdv(req, res) {
        const id = req.body.id
        const sql = await db.query(
            `DELETE FROM public.service_advs
            WHERE id = $1`, [id]
        )
        res.json('ok')
    }
}
module.exports = new serAdvController()