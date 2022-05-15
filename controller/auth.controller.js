const userController = require('./user.controller')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: "2h" })
}

class AuthController {
    async registration(req, res) {
        try {
            const { first_name, last_name, email, password } = req.body
            const candidate = await userController.findOneUserByEmail({ email });
            if (candidate.length != 0) {
                return res.status(400).json({ message: "Пользователь существует" })
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            await userController.createUserFromReg({ first_name, last_name, email, hashPassword })
            return res.json({ message: "Пользователь успешно зарегестрирован" })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Ошибка при регистрации' })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const User = await userController.findOneUserByEmail({ email })
            if (User.length == 0) {
                return res.json({ message: `Пользователь ${email} не найден` })
            }
            const user = User[0]
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.json({ message: 'Неверный пароль' })
            }
            const token = generateAccessToken(user.id, user.moder)
            return res
                .cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                .json({ message: "Вход выполнен успешно" });

        } catch (e) {
            console.log(e)
            return res.json({ message: 'Ошибка при входе' })
        }
    }
}

module.exports = new AuthController()