var express=require('express');
var router=express.Router();
var url=require('url')
var db=require('../../../db.js')
var projectService=require('../../service/projectService');
var ResponseEntity=require('../../../common/model/ResponseEntity')

const parUrl="/user"


router.get(parUrl+'/',function(req,res){
	let body=req.query;
	let id=body.id?body.id:'';
	let name=body.name?body.name:'';

	res.render("test",{
		title:'hello '+name+"("+id+")",
		content:'i am user'
	})
})

router.get(parUrl+'/getProjectById',function(req,res){
	let body=req.query;
	let id=body.id?body.id:'';
	if(!id){
		return 
	}

	projectService.getProjectById(id).then(function(_data){
		console.log('data:'+_data)
		res.status(200).send(ResponseEntity('200','ok',_data))
	}).catch((err)=>{
		res.status(500).send(ResponseEntity('500','err',err))
	});
})

router.get(parUrl+'/getProjectList',function(req,res){
	console.log('body',req.body)
	projectService.getProjectList(req.body).then(function(_data){
		console.log('data:'+_data)
		res.status(200).send(ResponseEntity('200','ok',_data))
	}).catch((err)=>{
		res.status(500).send(ResponseEntity('500','err',err))
	});
})

router.get(parUrl+'/getProjectPage',function(req,res){
	console.log('body',req.body)

	projectService.getProjectPage(req.body,req.body.offset,req.body.pageSize).then(function(_data){
		console.log('data:'+_data)
		res.status(200).send(ResponseEntity('200','ok',_data))
	}).catch((err)=>{
		res.status(500).send(ResponseEntity('500','err',err))
	});
})

router.get(parUrl+'/createProject',function(req,res){
	projectService.createProject({
		name:'我是create的2',
		wechat:'zzzz0008888',
		phone:'1838383838',
		age:13,
		qq:'000'
	}).then(function(_data){
		console.log('data:'+_data)
		res.status(200).send(ResponseEntity('200','ok'))
	}).catch((err)=>{
		console.log(err)
		res.status(500).send(ResponseEntity('500','err',err))
	});
})

router.get(parUrl+'/deleteUser',function(req,res){
	let body=req.query;
	let id=body.id?body.id:'';
	if(!id){
		return 
	}
	projectService.deleteUser(id).then(function(_data){
		console.log('data:'+_data)
		res.status(200).send(ResponseEntity('200','ok'))
	}).catch((err)=>{
		res.status(500).send(ResponseEntity('500','err',err))
	});
})

router.get(parUrl+'/testForAttachment',function(req,res){
	res.download('/updater.jar')
})

// router.get(parUrl+'/testMysql',function(req,res){
// 	var addSqlParams={};
// 	connection.query('select * from user',addSqlParams,function (err, result) {
// 	    if(err){
// 	     console.log('[INSERT ERROR] - ',err.message);
// 	     return;
// 	    }
// 	    console.log(result)
// 	});
// })

module.exports=router




