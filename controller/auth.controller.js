const userController = require('./user.controller')
const tokensController = require('./tokens.controller') 
const bcrypt = require('bcryptjs')

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
            
            await tokensController.createTokens(user.id, user.role, res)
            return res.json({ message: "Вход выполнен успешно" });

        } catch (e) {
            console.log(e)
            return res.json({ message: 'Ошибка при входе' })
        }
    }

    async recoveryPasswordToken(req, res) {
        try {
            const { email, code } = req.body
            const User = await userController.findOneUserByEmail({ email })
            if (User.length == 0) {
                return res.json({ message: `Пользователь ${email} не найден` })
            }
            const user = User[0]
            const tokenRecovery = tokensController.createRecoveryToken(user.id, code)
            return res.json({message: 'Пользователь найден' , tokenRecovery});

        } catch (e) {
            console.log(e)
            return res.json({ message: 'Ошибка при создании ссылки' })
        }
    }

    async logout(req, res) {
        await tokensController.deleteTokens(req.cookies.access_token, res)
        return res.json({ message: "Выход выполнен" });
    }

    async logoutAll(req, res) {
        await tokensController.deleteAllUserTokens(req.user.id, res)
        return res.json({ message: "Выход со всех устройств выполнен" });
    }
}

module.exports = new AuthController()