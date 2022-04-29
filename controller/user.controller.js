const db = require('../database/db')

class UserController {
    async createUser(req, res) {
        const {first_name, last_name, email, img} = req.body
        const sql = await db.query(
            `INSERT INTO public.users(
            first_name, last_name, email, img)
            VALUES ($1, $2, $3, $4)`, [first_name, last_name, email, img]
        )
    }
    async getUsers(req, res) {
        const sql = await db.query(
            `SELECT id, first_name, last_name, email, img, moder
            FROM public.users`
        )
        res.json(sql.rows)
    }
    async getOneUser(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT id, first_name, last_name, email, img, moder
            FROM public.users
            WHERE id = $1`, [id]
        )
        res.json(sql.rows)
    }
    async updateUser(req, res) {
        const {id, first_name, last_name, email, img} = req.body
        const sql = await db.query(
            `UPDATE public.users
            SET first_name=$1, last_name=$2, email=$3, img=$4
            WHERE id = $5`, [first_name, last_name, email, img, id]
        )
    }
    async deleteUser(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `DELETE FROM public.users
            WHERE id = $1`, [id]
        )
    }
}
module.exports = new UserController()