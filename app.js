var express=require('express')
const url=require('url')
const path=require('path');
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const colors=require('colors')
const morgan=require('morgan')
const fs=require('fs')
const jwt=require('./utils/jwt')

const CONFIG =require('./config')

// const db=require('./redis')

var app=express();
var xtpl=require('xtpl');


//middleware
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended:false
}))
app.use('*',function(req,res,next){
	console.log('Request path is :')
	console.log(colors.red(req.baseUrl))z
	next();
})
app.use('*',function(req,res,next){
	//检测登录状态
	let token=req.cookies.toke;
	if(!token){
		console.log('用户登录状态失效!')
	}else{
		jwt.checkToken(req.cookies.token).then(()=>{
			console.log('用户状态生效中...')
		}).catch(()=>{
			console.log('用户登录状态失效!')
		})
	}
	next();
})

//routes
// const routesUser=require('./routes/users/index.js')
// const routesIndex=require('./routes/index/index.js')
const routeUser=require('./api/manage/controller/UsersController')
const routeLogin=require('./api/manage/controller/LoginController')
//注意路由顺序
app.use('/index',routeLogin)
// app.use('/',[routeUser,routeLogin])
app.use('/user',routeUser)


//指定静态目录
app.use('/static',express.static(path.join(__dirname,"public")))

//模板引擎
app.set('views',path.join(__dirname,"views"))
app.set('view engine','xtpl');


// app.get('/',function(req,res){
// 	// res.send('<h1>h w</h1>')
// 	res.render("test",{
// 		title:'hello express',
// 		content:'cnm'
// 	})
// })
app.get('/*',function(req,res){
	res.send('<h1>404</h1>')
})

app.listen(CONFIG.dev.port,function(){
	console.log('server is runing at '+CONFIG.dev.port)
})

//logs
app.use(function(err,req,res,next){
	console.log(err.stack)
	res.send(500,'sth broking')
})

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(morgan('short', {stream: accessLogStream}));

//doesn't work
app.route('*').all(function(req,res,next){
	if(true){
		console.log('all1')
		next()
	}else{
		console.log('all2')
		next();
	}
})

console.log('i changed from 2 change again i ,change from change 1' )
//DEBUG

//app.params(['id','page'],function(){})
//app.params('id',function(){})

//app.get('/user/:id/:page',function(){})