const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

let testAccount = {user: 'toni28@ethereal.email', pass: 'EF1XXnwHqYv1Gfhenc'};
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

transport.use(
    "compile",
    hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: "templates/views/mail/",
            defaultLayout: false
        },
        extName: '.hbs',
        viewPath: "templates/views/mail"
    })
)
var send = (email, subject, template, {url, header_img, site_name})=>{
 transport.sendMail({
    from: process.env.email,
    to: email,
    subject: subject,
    template: template,
    context: {url, header_img, site_name}
})
}
module.exports = {
    sendResetEmail: async (email, token)=>{
        try {
            var url = `${process.env.SITE_URL}/reset-password?token=${token}`;
            send(email, `Reset Password of ${process.env.SITE_TITLE}`,'reset-password', {url, header_img:'', subject: `Reset Password Of ${process.env.SITE_TITLE}`, site_name: process.env.SITE_TITLE});
        } catch (e) {
            console.log(e.message);
        }
    },
    sendVerificationEmail: async(email, token)=>{
        try {
            var link = `${process.env.SITE_URL}/verify-mail?verification-token=${token}`;
            send(email, "Mail verifcation", 'verify-mail', {url: link, header_img: '', site_name: process.env.SITE_TITLE});
        } catch (error) {
           console.log(error.message);
        }

    }
}