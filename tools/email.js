const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport');
const emailTpl = require('./emailTpl')

module.exports = email = {
    nodemailerMailgun: nodemailer.createTransport(
        mg({
            auth: {
                api_key: process.env.MAILGUN_API_KEY || '4a915b8dbb6119d450feb8fd6f1ddedc-27a562f9-e944cf56',
                domain: process.env.MAILGUN_DOMAIN || 'sandboxa6b27a68caea4cdda4cfd6159322aab1.mailgun.org'
            }
        })
    ),
    send: (data) => {
        email.nodemailerMailgun.sendMail({
            from: 'no-reply@backend-full-stack-exam.herokuapp.com',
            to: data.to,
            subject: data.subject,
            html: data.html
        }, (err, info) => {

            if (err) {
                console.log(`Error: ${err}`);
            }
            else {
                console.log(`Response: ${JSON.stringify(info)}`);
            }

        })
    },
    verify: (to, id, verifyToken) => {
        const data = {
            to: to,
            subject: 'Verify Your Email',
            html: emailTpl.replace(emailTpl.verify, [id, verifyToken])
        }
        
        email.send(data)
    }
}