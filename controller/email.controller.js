const nodemailer = require('nodemailer');

exports.contact = function (req, res){
    var name = req.body.name;
    var from = "info.networking.utmn@gmail.com";
    var message = req.body.message;
    var to = req.body.to;

    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: from,
            pass: ''
        }
    };
    var smtpTransport = nodemailer.createTransport(smtpConfig);

    var mailOptions = {
        from: from,
        to: to, 
        subject: name,
        text: message
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            res.ok;
        }
    });
}