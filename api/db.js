var CONFIG=require('../config')
var mysql=require('mysql')
const { v4: uuidv4 } = require('uuid');
// var ResponseEntity=require('./common/model/ResponseEntity')

var DbConfig=CONFIG.dev.db
var config={
	host:DbConfig.host,
	user:DbConfig.user,
	password:DbConfig.user,
	database:DbConfig.database,
	// debug:true
}

var db={}
var pool=mysql.createPool(config);

/**
 * [query description]
 * @param  {[type]} options.sql      [description]
 * @param  {[type]} options.callback [description]
 * @param  {[type]} options.params   [description]
 * @return {[type]}                  [description]
 */
db.query=function({sql,params=[]}){
	console.log('test params'+params)
	return new Promise((resolve,reject)=>{
		pool.getConnection((error,connection)=>{
			if(error){
				reject(error)
				return ;
			}
			console.log('sql is'+sql)
			console.log('params is',params)

			connection.query(sql,...params,function(err,data){
				if(err){
					reject(error)
					return
				}
				console.log('The solution is: ', data);
				resolve(data)	
				connection.release();
			})
		})
	})
    
}

db.page=function({sql,params=[],offset=1,pageSize=10}){
	console.log('test params'+params)
	return new Promise((resolve,reject)=>{
		pool.getConnection((error,connection)=>{
			if(error){
				reject(error)
				return ;
			}
			console.log('sql is'+sql)
			console.log('params is',params)
			sql+=" limit "+((offset-1)*pageSize+1)+","+pageSize
			// sql+=";SELECT FOND_ROWS() AS total;"

			console.log(sql)
			connection.query(sql,...params,function(err,data){
				if(err){
					console.log(error)
					reject(error)
					return
				}
				console.log('The solution is: ', data);
				resolve(data)	
				connection.release();
			})
		})
	})
    
}
/**
 * [saveOrUpdate description]
 * @param  {[type]} options.entity [description]
 * @param  {[type]} options.table  [description]
 * @return {[type]}                [description]
 */
db.saveOrUpdate=function({entity,table}){
	return new Promise((resolve,reject)=>{
		if(!entity || !table){
			reject('需要传入参数')
		}
		pool.getConnection((error,connection)=>{
			if(error){
				reject(error)
				return ;
			}
			// var keys="",values="";
			// for(let i in entity){
			// 	if(keys){
			// 		keys+=","
			// 		values+=","
			// 	}
			// 	keys+=i;
			// 	values+="'"+entity[i]+"'";
			// }
			// let sql="INSERT INTO "+table+" ("+keys+") VALUES ("+values+")"
	
			let sql='';
			if(!entity.id){
				entity.id=uuidv4();
			// 	sql='UPDATE '+table +' SET ? where id='+entity.id
			// }else{
				
			}
			sql='INSERT INTO ' +table +' SET ?'
			console.log(sql)
			connection.query(sql,entity,function(err,data){
				console.log(data,err)
				if(err){
					reject(error)
					return
				}
				console.log('The solution is: ', data);
				resolve(data)	
				connection.release();
			})
		})
	})
    
}


module.exports=db;