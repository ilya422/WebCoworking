const eventAdvController = require('../controller/event_adv.controller');
module.exports = async function (req, res, next) {
    if (req.meth === "OPTIONS") {
        next()
    }

    try {
        event_faculty = await eventAdvController.getFacultyAdv(req)
        if (req.user.faculty == event_faculty.faculty || event_faculty.faculty == "Все") {
            next()
        }
        else {
            return res.json({message: "Не ваш факультет"})
        }
    } catch (e) {
        return res.json({message: "Не ваш факультет"})
    }
}