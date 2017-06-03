router.route('/login').get(function(req, res) {
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }

    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    res.render('login', {
        title: '用户登录',
        user: res.locals.islogin
    });
}).post(function(req, res) {
    client = dbCon.connect();
    result = null;
    dbCon.userSelect(client, req.body.username, function(result) {
        if (result[0] === undefined) {
            res.send('没有该用户');
        } else {
            console.log(result[0]);
            if (result[0].password === req.body.password) {

                var user_msg = {
                    user_name: req.body.username,
                    user_id: result[0].user_id
                };
                req.session.islogin = user_msg;
                res.locals.islogin = req.session.islogin;
                res.cookie('islogin', res.locals.islogin, {
                    maxAge: 60000
                });
                res.redirect('/home');
            } else {
                res.redirect('/login');
            }
        }
    });
});

router.get('/logout', function(req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});