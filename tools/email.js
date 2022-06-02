const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const mg = require('nodemailer-mailgun-transport');
const emailTpl = require('./emailTpl')

dotenv.config()

module.exports = email = {
    nodemailerMailgun: nodemailer.createTransport(
        mg({
            auth: {
                api_key: process.env.MAILGUN_API_KEY,
                domain: process.env.MAILGUN_DOMAIN
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