const db = require('../database/db')

class TagController {
    async createTag(req, res) {
        const {name} = req.body
        const sql = await db.query(
            `INSERT INTO public.tags(
            name)
            VALUES ($1)`, [name]
        )
        res.json('ok')
    }
    async getTags(req, res) {
        const sql = await db.query(
            `SELECT id, name
            FROM public.tags`
        )
        res.json(sql.rows)
    }
    async getOneTag(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT id, name
            FROM public.tags
            WHERE id = $1`, [id]
        )
        res.json(sql.rows)
    }
    async updateTag(req, res) {
        const {id, name} = req.body
        const sql = await db.query(
            `UPDATE public.tags
            SET name=$1
            WHERE id = $2`, [name, id]
        )
        res.json('ok')
    }
    async deleteTag(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `DELETE FROM public.tags
            WHERE id = $1`, [id]
        )
        res.json('ok')
    }
}
module.exports = new TagController()