const db = require('../database/db')

class TypeController {
    async createType(req, res) {
        const {name} = req.body
        const sql = await db.query(
            `INSERT INTO public.types(
            name)
            VALUES ($1)`, [name]
        )
        res.json('ok')
    }
    async getTypes(req, res) {
        const sql = await db.query(
            `SELECT t.id, t.name, r.name as low_role_to_create
            FROM public.types as t
            JOIN roles as r ON id_low_role_to_create = r.id`
        )
        res.json(sql.rows)
    }
    async getOneType(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT t.id, t.name, r.name as low_role_to_create
            FROM public.types as t
            JOIN roles as r ON id_low_role_to_create = r.id
            WHERE t.id = $1`, [id]
        )
        res.json(sql.rows)
    }
    async updateType(req, res) {
        const {id, name} = req.body
        const sql = await db.query(
            `UPDATE public.types
            SET name=$1
            WHERE id = $2`, [name, id]
        )
        res.json('ok')
    }
    async deleteType(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `DELETE FROM public.types
            WHERE id = $1`, [id]
        )
        res.json('ok')
    }
    async getTypesForCreateAd(req, res) {
        const role = req.user.role
        const sql1 = await db.query(
            `SELECT id FROM public.roles
            WHERE name = $1`, [role]
        )
        const id_role = sql1.rows[0].id
        const sql = await db.query(
            `SELECT t.id, t.name, r.name as low_role_to_create
            FROM public.types as t
            JOIN roles as r ON id_low_role_to_create = r.id
            WHERE r.id <= $1`, [id_role]
        )
        res.json(sql.rows)
    }
}
module.exports = new TypeController()