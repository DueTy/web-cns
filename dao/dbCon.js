var mysql = require('mysql');

function connectServer() {

    var client = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '7015258',
        database: 'cms',
        port: 3307
    })

    return client;
}


function selectFun(client, username, callback) {
    //client为一个mysql连接对象
    client.query('select password from user where username="' + username + '"', function(err, results, fields) {
        if (err) throw err;

        callback(results);
    });
}

function insertFun(client, username, password, callback) {
    client.query('insert into user value(?,?)', [username, password], function(err, result) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(err);
    });
}



exports.connect = connectServer;
exports.selectFun = selectFun;
exports.insertFun = insertFun;
