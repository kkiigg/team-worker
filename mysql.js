var express =require('express')
var mysql=require('mysql')

var connection =mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'localhost2'
})
connection.connect();

connection.query(addSql,addSqlParams,function (err, result) {
    if(err){
     console.log('[INSERT ERROR] - ',err.message);
     return;
    }
         
});
