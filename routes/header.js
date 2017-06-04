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
    if (byte>1048576) {
        byte_str = (byte/1048576).toFixed(0)+"MB";
    }else if(byte>1024){
        byte_str = (byte/1024).toFixed(1)+"KB";
    }else{
        byte_str = byte+"B";
    }
    return byte_str;
}
