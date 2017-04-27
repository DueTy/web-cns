
router.route('/reg').get(function(req, res) {
    res.render('reg', {
        title: '注册'
    });
}).post(function(req, res) {
    client = userCon.connect();
    userCon.insertFun(client, req.body.username, req.body.password, function(err) {
        if (err) throw err;
        if(!err){
            req.session.islogin = req.body.username;
            res.locals.islogin = req.session.islogin;
            res.cookie('islogin', res.locals.islogin, {
                maxAge: 60000
            });
            res.redirect('/regMsg');
        }else {
            res.redirect('/regMsg');
        }

    });
});

router.route('/regMsg').get(function(req, res){
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    var html = res.render('reg_msg', {
        msg: '注册成功',
        user: res.locals.islogin
    });
    // console.log(html);
});

