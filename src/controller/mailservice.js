const nodemailer = require('nodemailer');
const nodemailerhbs = require('nodemailer-express-handlebars');

let testAccount = await nodemailer.createTestAccount();
let transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass
    },
    tls: {
        rejectUnauthorized: false
    }
})

transport.user(
    "compile",
    nodemailerhbs({
        viewEngine: {
            defaultLayout: false
        },
        extName: '.hbs',
        viewPath: "temlates/views/mail/"
    })
)
module.exports = {
    async sendResetEmail(email, token){
        try {
            
        } catch (e) {
            
        }
    }
}