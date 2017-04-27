router.get('/home', function(req, res) {
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    res.render('home', {
        title: '首页',
        user: res.locals.islogin,        
        side_test_data: side_test_data
    });
});
