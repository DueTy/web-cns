var express = require('express');
var router = express.Router();
var userCon = require('../dao/dbCon');
var uuidV4 = require("uuid/v4");
//引入art-template，并延展.ejs
var art_temp = require("art-template");
require.extensions[".ejs"] = art_temp.extension;
//引入multer和md5依赖
var multer = require("multer");
var md5 = require("md5");

var side_test_data = [];
for (var i = 0; i < 20; i++) {
    var obj = {
        folder_name: "笔记"+(i+1),
        level: 1,
        sub_list:[
        	{
        		folder_name: "level2",
        		level:2,
        		sub_list: [
        			{
        				folder_name: "level3",
        				level:3,
        				sub_list:[]
        			}
        		]
        	}
        ]
    };
    side_test_data.push(obj); 
}

var search_test_data = [];
for (var i = 0; i < 8; i++) {
	var note_type = i%2===0?"note":"mk";
	var obj = {
		note_type: note_type
	};
	search_test_data.push(obj);
}
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
        side_data: side_test_data,
        search_data: search_test_data
    });
});

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
        side_data: side_test_data,
        search_data: search_test_data
    });
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
    userCon.userSelect(client, req.body.username, function(result) {
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
    var html = res.render('reg_msg', {
        msg: '注册成功',
        user: res.locals.islogin
    });
    // console.log(html);
});


var side_bar_item_temp = require("../views/sideItemTemp.ejs");

router.post("/newFolder",function(req, res, next){
	var item_data = {
		note_name: "新建文件夹"
	};

	var item_html = side_bar_item_temp({
		item: item_data
	});
	res.send({
		msg:"folder inited success",
		dom_data: item_html
	});


});

var search_bar_item_temp = require("../views/searchItemTemp.ejs");

router.post("/newNote", function(req, res, next){
	

	var item_data = {
		note_type: req.body.type
	};
	var item_html = search_bar_item_temp({
		item: item_data
	});
	
	res.send({
		msg: "note inited success",
		dom_data: item_html
	});

});

module.exports = router;