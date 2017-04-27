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
