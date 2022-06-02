const db = require('../database/db')

class FacultController {
    async createFacult(req, res) {
        const {name} = req.body
        const sql = await db.query(
            `INSERT INTO public.faculties(
            name)
            VALUES ($1)`, [name]
        )
        res.json('ok')
    }
    async getFacult(req, res) {
        const sql = await db.query(
            `SELECT id, name
            FROM public.faculties`
        )
        res.json(sql.rows)
    }
    async getOneFacult(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT id, name
            FROM public.faculties
            WHERE id = $1`, [id]
        )
        res.json(sql.rows)
    }
    async updateFacult(req, res) {
        const {id, name} = req.body
        const sql = await db.query(
            `UPDATE public.faculties
            SET name=$1
            WHERE id = $2`, [name, id]
        )
        res.json('ok')
    }
    async deleteFacult(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `DELETE FROM public.faculties
            WHERE id = $1`, [id]
        )
        res.json('ok')
    }
}
module.exports = new FacultController()