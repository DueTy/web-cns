var express = require('express');
var router = express.Router();
var dbCon = require('../dao/dbCon');
var uuidV4 = require("uuid/v4");
var sd_time = require("silly-datetime");
//引入art-template，并延展.ejs
var art_temp = require("art-template");
require.extensions[".ejs"] = art_temp.extension;
//引入multer和md5依赖
var multer = require("multer");
var md5 = require("md5");


function getDateTime(){
	return sd_time.format(new Date(), 'YYYY-MM-DD hh:mm:ss');
}

var side_test_data = [];
for (var i = 0; i < 10; i++) {
    var obj = {
        folder_name: "笔记"+(i+1),
        level: 1,
        folder_id: uuidV4(),
        sub_list:[
        	// {
        	// 	folder_name: "level21",
        	// 	level:2,
        	// 	folder_id: uuidV4(),
        	// 	sub_list: [
        	// 		{
        	// 			folder_name: "level3",
        	// 			level:3,
        	// 			folder_id: uuidV4(),
        	// 			sub_list:[]
        	// 		}
        	// 	]
        	// },{
        	// 	folder_name: "level22",
        	// 	level:2,
        	// 	folder_id: "folder"+(i+1)+"lv22",
        	// 	sub_list: [
        	// 	]
        	// }
        ]
    };
    side_test_data.push(obj); 
}

var search_test_data = [];
for (var i = 0; i < 8; i++) {
	var note_type = i%2===0?"note":"mk";
	var obj = {
        note_name: "日报 11.2"+(i+1),
		note_type: note_type,
		note_id: uuidV4()
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
        user_msg: res.locals.islogin, 
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

router.route('/reg').get(function(req, res) {
    res.render('reg', {
        title: '注册'
    });
}).post(function(req, res) {
    client = dbCon.connect();
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


var side_bar_item_temp = require("../views/sideItemTemp.ejs");

router.post("/newFolder",function(req, res, next){
	var client = dbCon.connect();

	var folder_id = uuidV4();
	var req_body = req.body;

	var user_msg = {};
	if(req.session.islogin){
		user_msg = req.session.islogin;
	}
	var new_folder_msg = {
		folder_id: uuidV4(),
		folder_name: "新建文件夹",
		folder_level: parseInt(req_body.par_folder_level)+1,
		belong_id: user_msg.user_id,
		par_folder_id: req_body.par_folder_id,
		created_at: getDateTime()
	};
	var sql_param = [
		new_folder_msg.folder_id,
		new_folder_msg.folder_name,
		new_folder_msg.folder_level,
		new_folder_msg.belong_id,
		new_folder_msg.par_folder_id,
		new_folder_msg.created_at
	];

	dbCon.folderInsert(client, sql_param, function(err){
		if (err) throw err;
		if(!err){
			var item_data = {
				folder_name: new_folder_msg.folder_name,
				level: new_folder_msg.folder_level,
				folder_id: new_folder_msg.folder_id
			};
			var item_html = side_bar_item_temp({
				item: item_data
			});
			res.send({
				msg:"folder inited success",
				dom_data: item_html,
				folder_id: new_folder_msg.folder_id
			});
		}
	});

	

	


});

var search_bar_item_temp = require("../views/searchItemTemp.ejs");

router.post("/newNote", function(req, res, next){
	

	var item_data = {
		note_name: "新建笔记",
		note_type: req.body.type,
		note_id: uuidV4()
	};
	var item_html = search_bar_item_temp({
		item: item_data
	});
	
	res.send({
		msg: "note inited success",
		dom_data: item_html
	});

});

router.post("/getNoteList",function(req, res, next){
	var req_folder = req.body.folder_id;

	var list_dom = "",
		list_data = [
			{
				note_name: "日报 11.25",
				note_type: "note",
				note_id: uuidV4()
			},{
				note_name: "日报 11.26",
				note_type: "mk",
				note_id: uuidV4()
			},{
				note_name: "日报 11.27",
				note_type: "note",
				note_id: uuidV4()
			},{
				note_name: "日报 11.28",
				note_type: "mk",
				note_id: uuidV4()
			}
		]

	for (var i = 0; i < list_data.length; i++) {
		list_dom += search_bar_item_temp({
			item: list_data[i]
		});
	}

	res.send({
		msg: "folder's notes get successfully",
		list_dom: list_dom
	})

});

router.post("/rename",function(req, res, next){
	var client = dbCon.connect();
	var req_body = req.body;

	dbCon.renameFun(client,req_body,function(err,result){
		if (err) throw err;
		if(!err){
			res.send({
				msg: req_body.entity_type+" rename success",
				new_name: req_body.val,
				is_affected: result.affctedRows>0?true:false
			});
		}
	});
});

module.exports = router;