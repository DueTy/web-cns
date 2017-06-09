
router.route('/reg').get(function(req, res) {
    res.render('reg', {
        title: '注册'
    });
}).post(function(req, res) {
    var req_body = req.body;
    
    var user_msg = {
        user_id: uuidV4(),
        user_name: req_body.username,
        gender: req_body.gender,
        personal_desc: req_body.personal_desc,
        password: req_body.password,
        orgnazition_build_count: 1,
        created_at: getDateTime(),
        belong_org_id: "",
        note_mag_permisstion: 0
    };
    var sql_param =[
        user_msg.user_id,
        user_msg.user_name,
        user_msg.gender,
        user_msg.personal_desc,
        user_msg.password,
        user_msg.orgnazition_build_count,
        user_msg.created_at,
        user_msg.belong_org_id,
        user_msg.note_mag_permisstion
    ];
    dbCon.userInsert(client,
     sql_param,
     function(err) {
        if (err) throw err;
        if(!err){
            req.session.islogin = user_msg.user_name;
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

