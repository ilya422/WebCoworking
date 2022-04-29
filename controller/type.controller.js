const db = require('../database/db')

class TypeController {
    async createType(req, res) {
        const {name} = req.body
        const sql = await db.query(
            `INSERT INTO public.types(
            name)
            VALUES ($1)`, [name]
        )
    }
    async getTypes(req, res) {
        const sql = await db.query(
            `SELECT id, name
            FROM public.types`
        )
        res.json(sql.rows)
    }
    async getOneType(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT id, name
            FROM public.types
            WHERE id = $1`, [id]
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
    }
    async deleteType(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `DELETE FROM public.types
            WHERE id = $1`, [id]
        )
    }
}
module.exports = new TypeController()