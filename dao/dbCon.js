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
function renameFun(client, rename_msg, callback) {
    var type = rename_msg.entity_type,
        val = rename_msg.val,
        id = rename_msg.entity_id;
    var sql = "update "+tables[type]+" set "+type+"_name='"+val+"' where "+type+"_id='"+id+"'";
    client.query(sql,function(err,result){
        console.log(sql);
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
exports.renameFun = renameFun;

