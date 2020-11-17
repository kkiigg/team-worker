var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
	res.render("test",{
		title:'hello express',
		content:'cnm'
	})
})

router.get('/test',function(req,res){
	res.end("i ama test content")
})

module.exports=router