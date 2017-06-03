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

function getDate(dateTime){
    return sd_time.format(dateTime, "YYYY-MM-DD");
}

function calcuByteLength(text){
    var bf = new Buffer(text);
    var byte = bf.length,
        byte_str = "";
    if (byte>1024) {
        byte_str = byte/1024+"KB";
    }else{
        byte_str = byte+"B";
    }
    return byte_str;
}

router.get('/home', function(req, res) {
    var client = dbCon.connect(),
        folder_list_data = [],
        view_list_data = [];

    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    var user_msg = res.locals.islogin;
   
    dbCon.folderSelect(client, user_msg.user_id, function(err,result){
        if(err) throw err;
        if(!err){
            var max_level = 1,
                temp_arr = [],
                temp_2d_arr = [];
            for (var i = 0; i < result.length; i++) {                
                if (result[i].folder_level>max_level) {
                    max_level = result[i].folder_level;
                }
                result[i].sub_list = [];
                temp_arr.push(result[i]);
            }
            for (var i = 0; i < max_level; i++) {
                temp_2d_arr.push(new Array());
            }
            for (var i = 0; i < temp_arr.length; i++) {
                temp_2d_arr[temp_arr[i].folder_level-1].push(temp_arr[i]);
            }
            arrRecur(folder_list_data, temp_2d_arr, 0, max_level, "root");

            var note_select_opt = {
                belong_folder_id: "root",
                user_id: user_msg.user_id
            };

            dbCon.noteSelect(client, note_select_opt, function(err,result){
                if(err) throw err;
                if(!err){
                    var view_list_data = result;
                    res.render('home', {
                        title: '首页',
                        user_msg: res.locals.islogin, 
                        side_data: folder_list_data,
                        search_data: view_list_data
                    });
                }
            });            
        }
    }); 

    function arrRecur(sub_list, temp_2d_arr, cur_level, max_level, par_folder_id){
        cur_level++;
        if(cur_level>max_level){
            return false;
        }else{

            for (var i = 0; i < temp_2d_arr[cur_level-1].length; i++) {
                var this_folder = temp_2d_arr[cur_level-1][i];

                if (this_folder.par_folder_id === par_folder_id) {
                    sub_list.push(this_folder);
                    arrRecur(
                        this_folder.sub_list, 
                        temp_2d_arr, 
                        cur_level, 
                        max_level,
                        this_folder.folder_id
                    );
                }
            }            
            
        }
    }
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
    res.redirect('/login');
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
				folder_level: new_folder_msg.folder_level,
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
	var client = dbCon.connect();
	var req_body = req.body;
	
	var user_msg = req.session.islogin;

	var created_at = getDateTime(),
		modify_date = getDate(created_at);
	var note_msg = {
		note_id: uuidV4(),
		note_name: "新建笔记",
		note_type: req_body.type,
		owner_id: user_msg.user_id,
		belong_folder_id: req_body.belong_folder_id,
		created_at: created_at,
		modify_date: modify_date,
		note_content: "",
		note_size: "0B"
	};

	var sql_param = [
		note_msg.note_id,
		note_msg.note_name,
		note_msg.note_type,
		note_msg.owner_id,
		note_msg.belong_folder_id,
		note_msg.created_at,
		note_msg.modify_date,
		note_msg.note_content,
		note_msg.note_size
	];

	dbCon.noteInsert(client, sql_param, function(err,result){
		if (err) throw err;
		if(!err){
			var item_data = {
				note_name: note_msg.note_name,
				note_type: note_msg.note_type,
				note_id: note_msg.note_id,
				modify_date: note_msg.modify_date,
				note_size: note_msg.note_size
			};
			var item_html = search_bar_item_temp({
				item: item_data
			});

			res.send({
				msg: "note inited success",
				dom_data: item_html
			});
		}
	});
});

router.post("/getNoteList",function(req, res, next){
	var client = dbCon.connect();
	var req_folder = req.body.belong_folder_id;

	var list_dom = "",
		list_data = [];

	var user_msg = req.session.islogin,
		sql_param = {
			user_id: user_msg.user_id,
			belong_folder_id: req_folder
		};

	dbCon.noteSelect(client, sql_param, function(err, result){
		if(err) throw err;
		if(!err){
			list_data = result;
			console.log(result);
			for (var i = 0; i < list_data.length; i++) {
				list_dom += search_bar_item_temp({
					item: list_data[i]
				});
			}

			res.send({
				msg: "folder's notes get successfully",
				list_dom: list_dom
			});
		}
	});

	

});
router.post("/rename",function(req, res, next){
	var client = dbCon.connect();
	var req_body = req.body;

	dbCon.renameFun(client,req_body,function(err,result){
		if (err) throw err;
		if(!err){
			var is_affected = result.affectedRows>0?true:false;
			res.send({
				msg: req_body.entity_type+" rename success",
				new_name: req_body.val,
				is_affected: is_affected
			});
		}
	});
});

module.exports = router;