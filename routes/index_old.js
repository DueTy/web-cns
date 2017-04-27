var express = require('express');
var router = express.Router();
var userCon = require('../dao/dbCon');
//引入art-template，并延展.ejs
var art_temp = require("art-template");
require.extensions[".ejs"] = art_temp.extension;



var side_test_data = [];
for (var i = 0; i < 20; i++) {
    // var obj = {
    //     note_name: "笔记"+(i+1)
    // };
    side_test_data.push("笔记"+(i+1)); 
}


/* GET home page. */
router.get('/', function(req, res) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    res.render('index', {
        title: '首页',
        user: res.locals.islogin,
        side_test_data: side_test_data
    });

console.log(side_test_data);
});
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
    client = userCon.connect();
    result = null;
    userCon.selectFun(client, req.body.username, function(result) {
        if (result[0] === undefined) {
            res.send('没有该用户');
        } else {
            if (result[0].password === req.body.password) {
                req.session.islogin = req.body.username;
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
    console.log(side_test_data);
});

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

var side_bar_temp = require("../views/sideBar.ejs");

var side_bar_html = side_bar_temp({
            side_test_data:side_test_data
        }
    );
// console.log(side_bar_html);

module.exports = router;
