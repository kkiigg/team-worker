const express=require('express')
const router=express.Router()

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwtUtil=require("../../../../utils/jwt.js");

var ResponseEntity=require('../../../common/model/ResponseEntity')
var userService=require('../../service/userService');

router.post('/login',function(req,res){
	let username=req.body.name
	let password=req.body.password
	if(!username || !password){
		res.status(500).send(ResponseEntity('500','需要输入用户名或密码'))
	}
	userService.getUserByUserName(username).then(async function(data){
		console.log('data a'+jwtUtil.createToken())
		if(!data.length){
			res.status(500).send(ResponseEntity('500','该用户未注册'))
			return;
		}
		const match = await bcrypt.compare(password, data[0].password);
		if(match){
			res.status(200).send(ResponseEntity('200','登录成功',{
				token:jwtUtil.createToken()
			}))
		}else{
			res.status(500).send(ResponseEntity('500','账号或者密码错误'))
		}
	}).catch(()=>{
		res.status(500).send(ResponseEntity('500','该用户未注册'))
	})
	
})

router.post('/regist',function(req,res){
	let username=req.body.name
	let password=req.body.password
	if(!username || !password){
		res.status(500).send(ResponseEntity('500','需要输入用户名或密码'))
		return
	}
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);

	userService.createUser({
		name:username,
		password:hash,
		role:1,
		status:1,
	}).then(function(_data){
		debugger
		console.log('data:'+_data)
		res.status(200).send(ResponseEntity('200','注册成功！'))
	}).catch((err)=>{
		console.log(err)
		res.status(500).send(ResponseEntity('500','err',err))
	});
})

module.exports=router
