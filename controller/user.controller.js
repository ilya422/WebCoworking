const db = require('../database/db')
const bcrypt = require('bcryptjs');

class UserController {
    async createUser(req, res) {
        const {first_name, last_name, email, id_faculty, password} = req.body
        const sql = await db.query(
            `INSERT INTO public.users(
            first_name, last_name, email, id_faculty, password)
            VALUES ($1, $2, $3, $4, $5)`, [first_name, last_name, email, id_faculty, password]
        )
        res.json({message: "Пользователь создан"})
    }

    async createUserFromReg(req) {
        const {first_name, last_name, email, id_faculty, hashPassword} = req
        const sql = await db.query(
            `INSERT INTO public.users(
            first_name, last_name, email, id_faculty, password)
            VALUES ($1, $2, $3, $4, $5)`, [first_name, last_name, email, id_faculty, hashPassword]
        )
        return
    }

    async getUsers(req, res) {
        const id = req.params.id
        const sql = await db.query(
            `SELECT u.id, first_name, last_name, email, f.name as faculty, r.name as role, img
            FROM public.users as u
			JOIN public.faculties as f ON id_faculty = f.id
            JOIN public.roles as r ON id_roles = r.id`
        )
        res.json(sql.rows)
    }

    async getOneUserByID(req, res) {
        const id = req.user.id
        const sql = await db.query(
            `SELECT u.id, first_name, last_name, email, f.id as id_faculty, f.name as faculty, r.name as role, img
            FROM public.users as u
			JOIN public.faculties as f ON id_faculty = f.id
            JOIN public.roles as r ON id_roles = r.id
            WHERE u.id = $1`, [id]
        )
        res.json(sql.rows)
    }

    async getOneUserByEmail(req, res) {
        const email = req.params.email
        const sql = await db.query(
            `SELECT u.id, first_name, last_name, email, f.name as faculty, r.name as role, img
            FROM public.users as u
			JOIN public.faculties as f ON id_faculty = f.id
            JOIN public.roles as r ON id_roles = r.id
            WHERE email = $1`, [email]
        )
        res.json(sql.rows)
    }

    async findOneUserByEmail(req) {
        const email = req.email
        const sql = await db.query(
            `SELECT u.id, first_name, last_name, email, f.name as faculty, r.name as role, password, img
            FROM public.users as u
            JOIN public.faculties as f ON id_faculty = f.id
            JOIN public.roles as r ON id_roles = r.id
            WHERE email = $1`, [email]
        )
        return sql.rows
    }

    async findOneUserByID(id) {
        const sql = await db.query(
            `SELECT u.id, f.name as faculty, r.name as role
            FROM public.users as u
            JOIN public.faculties as f ON id_faculty = f.id
            JOIN public.roles as r ON id_roles = r.id
            WHERE u.id = $1`, [id]
        )
        return sql.rows
    }

    async updateUser(req, res) {
        const {first_name, last_name, id_faculty, img} = req.body
        const id = req.user.id
        const sql = await db.query(
            `UPDATE public.users
            SET first_name=$1, last_name=$2, id_faculty=$3, img=$4
            WHERE id = $5`, [first_name, last_name, id_faculty, img, id]
        )
        res.json('ok')
    }

    async updateUserWithPassword(req, res) {
        const id = req.user.id
        const {first_name, last_name, id_faculty, img} = req.body
        const old_password = req.body.old_password
        const new_password = req.body.new_password

        const sql_get = await db.query(
            `SELECT id, password
            FROM public.users
            WHERE id = $1`, [id]
        )
        const user = sql_get.rows[0]
        const validPassword = bcrypt.compareSync(old_password, user.password)
        if (!validPassword) {
            return res.json({ message: 'Неверный пароль' })
        }
        else {
            const hashPassword = bcrypt.hashSync(new_password, 7)
            const sql_update = await db.query(
                `UPDATE public.users
                SET first_name=$1, last_name=$2, id_faculty=$3, img=$4, password = $5
                WHERE id = $6`, [first_name, last_name, id_faculty, img, hashPassword, id]
            )
            return res.json({ message: 'ok'})
        }
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
}
module.exports = new UserController()