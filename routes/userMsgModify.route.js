router.route('/userMsgModify').get(function(req, res) {

}).post(function(req, res) {
    var req_body = req.body;
    
    var user_id = req.session.islogin.user_id;
    var user_msg = {
        user_name: req_body.username,
        gender: req_body.gender,
        personal_desc: req_body.personal_desc,
        password: req_body.password,
        user_id: user_id
    };
    dbCon.userUpdate(client,
     user_msg,
     function(err) {
        if (err) throw err;
        if(!err){
            res.clearCookie('islogin');
            req.session.destroy();
            res.redirect('/login');
        }

    });
});