const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport');
const emailTpl = require('./emailTpl')

module.exports = email = {
    nodemailerMailgun: nodemailer.createTransport(
        mg({
            auth: {
                api_key: process.env.MAILGUN_API_KEY || 'b00baa8f49f14b588741db879dcdd4e0-27a562f9-038b7024',
                domain: process.env.MAILGUN_DOMAIN || 'sandboxfb28f76b91d84c28af45eaad46a7fc6e.mailgun.org'
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