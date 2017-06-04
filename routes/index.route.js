/* GET home page. */
router.get('/', function(req, res) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
        res.redirect("/home");
    }else{
        res.locals.islogin = req.session.islogin;
        res.redirect("/login");
    }
});