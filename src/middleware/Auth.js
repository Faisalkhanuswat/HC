module.exports = {
    isAuthenticated : (req, res, next)=>{
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/login');
    },
    isLoggedin: (req, res, next)=>{
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        if(req.isAuthenticated()){
            return res.redirect('/dashboard');
        }
        return next();
    },
    isAdmin: (req, res, next)=>{
        if(req.user.role == 'admin'){
            return next();
        }
        req.flash('alert', {message: 'Cannot access to this page', type: 'danger'});
        res.redirect('/dashboard');
    },
    isStudent: (req, res, next)=>{
        if(req.user.role == 'student'){
            return next();
        }
        req.flash('alert', {message: 'Cannot access to this page', type: 'danger'});
        res.redirect('/dashboard');
    }
}