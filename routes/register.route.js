
router.route('/reg').get(function(req, res) {
    res.render('reg', {
        title: '注册'
    });
}).post(function(req, res) {
    client = userCon.connect();
    var user_name = req.body.username,
        user_password = req.body.password,
        user_id = uuidV4();
    userCon.userInsert(client,
     user_name, 
     user_password, 
     user_id, 
     function(err) {
        if (err) throw err;
        if(!err){
            req.session.islogin = user_name;
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
    var html = res.render('regMsg', {
        msg: '注册成功',
        user: res.locals.islogin
    });
});

