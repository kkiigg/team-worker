var db=require('../../../db.js')
const STATUS=require('../../../../const/status')

module.exports.getUserList=(_user)=>{
	if(JSON.stringify(_user) =='{}'){
		_user={
			status: STATUS.NORMAL
		}
	}
	return db.query({
		sql:'SELECT * FROM USER WHERE ?',
		params:[
			_user
		],
	})
}

module.exports.getUserPage=(_user,offset,pageSize)=>{
	if(JSON.stringify(_user) =='{}'){
		_user={
			status: STATUS.NORMAL
		}
	}

	return db.query({
		sql:'SELECT * FROM USER WHERE ?',
		params:[
			_user
		],
	})
}

module.exports.getUserPage=(_user,_offset,_pageSize)=>{
	if(JSON.stringify(_user) =='{}'){
		_user={
			status: STATUS.NORMAL
		}
	}
	return db.page({
		sql:'SELECT * FROM USER WHERE ?',
		params:[
			_user
		],
		_offset,
		_pageSize
	})
}

module.exports.getUserById=(id)=>{
	return db.query({
		sql:'SELECT * FROM USER WHERE ID = ? and status='+ STATUS.NORMAL,
		params:[
			id
		],
	})
}

module.exports.getUserByUserName=function(_username){
	return db.query({
		sql:'SELECT * FROM USER WHERE NAME = ?',
		params:[
			_username,
		],
	})
}

module.exports.deleteUser=(id)=>{
	return db.query({
		sql:'DELETE FROM USER WHERE ID = ?',
		params:[
			id
		],
	})
}

module.exports.createUser=(_user)=>{
	_user.status=STATUS.NORMAL;
	return db.saveOrUpdate({
		entity:_user,
		table:'USER'
	})
}
