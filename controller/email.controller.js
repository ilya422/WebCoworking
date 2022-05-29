const nodemailer = require('nodemailer');
const { email_pass } = require('../config')

function Send(res, name, message, to) {
    var from = "info.networking.utmn@gmail.com";

    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: from,
            pass: email_pass
        }
    };
    var smtpTransport = nodemailer.createTransport(smtpConfig);

    var mailOptions = {
        from: from,
        to: to,
        subject: name,
        text: message
    }

    smtpTransport.sendMail(mailOptions, function (error, res) {
        if (error) {
            return console.log(error);
        } else {
            return res.json('ok');
        }
    });
}


class EmailController {
    async SendEmail(req, res) {
        var name = req.body.name;
        var message = req.body.message;
        var to = req.body.to;
        Send(res, name, message, to)
        return
    }

    async SendEmailingList(req, res) {
        const users_list = req.body.users
        const url = req.body.url
        for (var u in users_list) {
            var u = users_list[u];
            let name = "Новое мероприятие по вашей подписке"
            let message = `Тег: ${u.tag_name}\nСсылка на мероприятие:\n${url}`
            let to = u.email
            setTimeout(function () {
                Send(res, name, message, to);
            }, 1000)
            return res.json('ok')
        }
    }
}
module.exports = new EmailController()