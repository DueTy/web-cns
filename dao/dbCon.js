var mysql = require('mysql');

function connectServer() {

    var client = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '701525',
        database: 'cns',
        port: 3306
    })

    return client;
}

var tables = {
    user: "user",
    folder: "folder",
    note: "note"
};


function userSelect(client, username, callback) {
    //client为一个mysql连接对象
    client.query('select password,user_id from '+tables["user"]+' where username="' + username + '"', function(err, results, fields) {
        if (err) throw err;
        callback(results);
    });
}

function userInsert(client, user_msg, callback) {
    client.query('insert into user value(?,?,?,?,?,?,?,?,?)', user_msg, function(err, result) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err);
    });
}
function folderInsert(client, folder_msg, callback) {
    client.query('insert into folder value(?,?,?,?,?,?)',folder_msg,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err);
    });
}
function noteInsert(client, note_msg, callback) {
    client.query('insert into note value(?,?,?,?,?,?,?,?,?)', note_msg,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err);
    });
}

function folderSelect(client, owner, callback){
    var sql = "select folder_id,folder_name,folder_level,par_folder_id from folder where belong_id='"
    +owner+"' order by created_at DESC";
    client.query(sql,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });
}
function noteSelect(client, select_opt, callback){
    var belong_folder = select_opt.belong_folder_id,
        owner = select_opt.user_id;
    var sql = "select note_id,note_name,note_type,modify_date,note_size "+
    " from note where belong_folder_id='"+belong_folder+"' and owner_id='"+owner+
    "' order by created_at DESC";
    client.query(sql,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });

}

function renameFun(client, rename_msg, callback) {
    var type = rename_msg.entity_type,
        val = rename_msg.val,
        id = rename_msg.entity_id;
    var sql = "update "+tables[type]+" set "+type+"_name='"+val+"' where "+type+"_id='"+id+"'";
    client.query(sql,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });
}



exports.connect = connectServer;
exports.userSelect = userSelect;
exports.userInsert = userInsert;
exports.folderInsert = folderInsert;
exports.noteInsert = noteInsert;
exports.folderSelect = folderSelect;
exports.noteSelect = noteSelect;
exports.renameFun = renameFun;

