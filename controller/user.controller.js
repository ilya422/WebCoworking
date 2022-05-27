const db = require('../database/db')
const bcrypt = require('bcryptjs');

class UserController {
    async createUser(req, res) {
        const {first_name, last_name, email, password} = req.body
        const sql = await db.query(
            `INSERT INTO public.users(
            first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)`, [first_name, last_name, email, password]
        )
        res.json({message: "Пользователь создан"})
    }
    async getUsers(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT u.id, first_name, last_name, email, r.name as role, img
            FROM public.users as u
            JOIN public.roles as r ON id_roles = r.id`
        )
        res.json(sql.rows)
    }
    async getOneUserByID(req, res) {
        const id = req.user.id
        const sql = await db.query(
            `SELECT u.id, first_name, last_name, email, r.name as role, img
            FROM public.users as u
            JOIN public.roles as r ON id_roles = r.id
            WHERE u.id = $1`, [id]
        )
        res.json(sql.rows)
    }
    async getOneUserByEmail(req, res) {
        const email = req.params.email
        const sql = await db.query(
            `SELECT u.id, first_name, last_name, email, r.name as role, img
            FROM public.users as u
            JOIN public.roles as r ON id_roles = r.id
            WHERE email = $1`, [email]
        )
        res.json(sql.rows)
    }
    async updateUser(req, res) {
        const {first_name, last_name, email, img} = req.body
        const id = req.user.id
        const sql = await db.query(
            `UPDATE public.users
            SET first_name=$1, last_name=$2, email=$3, img=$4
            WHERE id = $5`, [first_name, last_name, email, img, id]
        )
        res.json('ok')
    }
    async updateUserPasswordRecovery(req, res) {
        const id = req.user.id
        const password = req.body.password
        const hashPassword = bcrypt.hashSync(password, 7)
        const sql = await db.query(
            `UPDATE public.users
            SET password = $1
            WHERE id = $2`, [hashPassword, id]
        )
        res.json({ message: 'Пароль обновлён'})
    }
    async deleteUser(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `DELETE FROM public.users
            WHERE id = $1`, [id]
        )
        res.json('ok')
    }

    async findOneUserByEmail(req) {
        const email = req.email
        const sql = await db.query(
            `SELECT u.id, first_name, last_name, email, r.name as role, password, img
            FROM public.users as u
            JOIN public.roles as r ON id_roles = r.id
            WHERE email = $1`, [email]
        )
        return sql.rows
    }

    async createUserFromReg(req) {
        const {first_name, last_name, email, hashPassword} = req
        const sql = await db.query(
            `INSERT INTO public.users(
            first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)`, [first_name, last_name, email, hashPassword]
        )
        return
    }

    async createUserFromForgot(req) {
        const {email, hashPassword} = req
        const sql = await db.query(
            `UPDATE public.users
            SET password=$1
            WHERE email = $2`, [hashPassword, email]
        )
        return
    }
}
module.exports = new UserController()