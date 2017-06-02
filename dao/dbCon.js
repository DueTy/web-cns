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
    client.query('select password from '+tables["user"]+' where username="' + username + '"', function(err, results, fields) {
        if (err) throw err;
        callback(results);
    });
}

function userInsert(client, username, password, user_id, callback) {
    client.query('insert into user value(?,?,?)', [username, password, user_id], function(err, result) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err);
    });
}

// function addNoteTable(client, userId, user){
//     client.query("insert into note value(?,?,?)",[userid])
// }



exports.connect = connectServer;
exports.userSelect = userSelect;
exports.userInsert = userInsert;

