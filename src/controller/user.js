const {validationResult} = require('express-validator');
module.exports= {
    login: (req, res)=>{
        res.render('Login',{
            title: 'Login'
        });
    },
    signup: (req, res)=>{
        res.render('signup',{
            title: 'Signup'
        });
    },
    blog: (req, res)=>{
        res.render('blog',{
            title: 'Blog'
        });
    },
    doSignup: async (req, res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                olddata = req.body;
                delete olddata.password;
                delete olddata.confirmPassword;
                res.locals.oldData = olddata;
                return res.status(400).redirect('/signup');
            }
            res.send(req.body);
        } catch (error) {
            res.status(404).send({
                error: error.message
              });
        }
    }
}