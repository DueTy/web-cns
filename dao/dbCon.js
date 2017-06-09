var mysql = require('mysql');

function connectServer() {

    var client = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '701525',
        database: 'cns',
        port: 3306,
        connectionLimit:1
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

function userUpdate(client, user_msg, callback) {
    var set_opt = "username='"+user_msg.user_name+"',gender='"
    +user_msg.gender+"',personal_desc='"+user_msg.personal_desc
    +"',password='"+user_msg.password+"'";
    client.query("update user set "+set_opt+" where user_id='"+user_msg.user_id+"'", user_msg, function(err, result) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err);
    });
}
function folderInsert(client, folder_msg, callback) {
    client.query('insert into folder value(?,?,?,?,?,?,?)',folder_msg,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err);
    });
}
function noteInsert(client, note_msg, callback) {
    client.query('insert into note value(?,?,?,?,?,?,?,?,?,?,?)', note_msg,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err);
    });
}

function folderSelect(client, owner, callback){
    var sql = "select folder_id,folder_name,folder_level,par_folder_id from folder where belong_id='"
    +owner+"' order by folder_name ASC";
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
    var sql = "select note_id,note_name,note_type,note_abstract,show_modify,note_size "+
    " from note where belong_folder_id='"+belong_folder+"' and owner_id='"+owner+
    "' order by modify_time DESC";
    client.query(sql,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });

}
function folderDel(client, del_arr, callback){
    var set_str = "",
        tail = ",";
    for (var i = 0; i < del_arr.length; i++) {
        if(i===del_arr.length-1){
            tail = "";
        }
        set_str+= "'"+del_arr[i]+"'"+tail;
    }
    var sql = "delete from folder where folder_id in ("+set_str+")";
    client.query(sql,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });
}

function noteDel(client, condition, callback){
    var sql = "delete from note where "+condition;

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
        id = rename_msg.entity_id,
        modify_time = rename_msg.modify_time;
        set_val = "";
    if (type === "note") {
        set_val = " set note_name='"+val+"',modify_time='"+
        modify_time+"',show_modify='"+rename_msg.show_modify+"'";
    }else{
        set_val = " set folder_name='"+val+"',modify_time='"+modify_time+"'";
    }
    var sql = "update "+tables[type]+set_val+" where "+type+"_id='"+id+"'";
    client.query(sql,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });
}

function noteSave(client, save_opt, callback) {
    var user_id = save_opt.user_id,
        content = save_opt.note_content,
        note_id = save_opt.note_id,
        abstract = save_opt.note_abstract,
        size = save_opt.note_size,
        show_modify = save_opt.show_modify;
    var sql = 'update note set note_content="'+content+
    '",note_abstract="'+abstract+
    '",note_size="'+size+
    '",show_modify="'+show_modify+
    '" where note_id="'+note_id+'"';
    console.log(sql);
    client.query(sql,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });
}
function noteGet(client, get_opt, callback) {
    var note_id = get_opt.note_id;
    var sql = "";
    if(get_opt.share_note_get){
        var sql = "select note_content,note_name from note where note_id='"+note_id+"'";
    }else{
        var sql = "select note_content from note where note_id='"+note_id+"'";
    }
    client.query(sql,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });
}
function newestAndSearch(client, get_sql, callback) {
    var sql = get_sql;
    console.log(sql);
    client.query(sql,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });
}

function verSave(client, ver_value, callback) {
    var sql = "insert into historical_note value(?,?,?,?,?,?,?)";
    client.query(sql, ver_value,function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });
}
function verGet(client, get_opt, callback) {
    var select_opt = get_opt.select_opt,
        where_opt = get_opt.where_opt;

    var sql = "select "+select_opt+" from historical_note"+
    " where "+where_opt+" order by created_at DESC";
    console.log(sql);
    client.query(sql, function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });
}
function verBack(client, back_opt, callback) {
    var note_id = back_opt.note_id,
        ver_id = back_opt.ver_id;
    var sql = "update note set note_content=(select note_content from historical_note where note_id='"+ver_id+"'),"
    +"note_abstract=(select note_abstract from historical_note where note_id='"+ver_id+"') "+
    " where note_id='"+note_id+"'";
    console.log(sql);
    client.query(sql, function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });
}

function verDel(client, ver_id, callback) {
    var sql = "delete from historical_note where note_id='"+ver_id+"'";
    client.query(sql, function(err,result){
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err,result);
    });
}

exports.connect = connectServer;
exports.userSelect = userSelect;
exports.userInsert = userInsert;
exports.userUpdate = userUpdate;
exports.folderInsert = folderInsert;
exports.noteInsert = noteInsert;
exports.folderSelect = folderSelect;
exports.noteSelect = noteSelect;
exports.folderDel = folderDel;
exports.noteDel = noteDel;
exports.renameFun = renameFun;
exports.noteSave = noteSave;
exports.noteGet = noteGet;
exports.newestAndSearch = newestAndSearch;
exports.verSave = verSave;
exports.verGet = verGet;
exports.verBack = verBack;
exports.verDel = verDel;
