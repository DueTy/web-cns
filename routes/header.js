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