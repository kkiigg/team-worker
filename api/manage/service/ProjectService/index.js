var db=require('../../../db.js')
const STATUS=require('../../../../const/status')

module.exports.getProjectList=(_project)=>{
	if(JSON.stringify(_project) =='{}'){
		_project={
			status: STATUS.NORMAL
		}
	}
	return db.query({
		sql:'SELECT * FROM Project WHERE ?',
		params:[
			_project
		],
	})
}

module.exports.getProjectPage=(_user,offset,pageSize)=>{
	if(JSON.stringify(_user) =='{}'){
		_user={
			status: STATUS.NORMAL
		}
	}

	return db.query({
		sql:'SELECT * FROM Project WHERE ?',
		params:[
			_user
		],
	})
}

module.exports.getProjectPage=(_project,_offset,_pageSize)=>{
	if(JSON.stringify(_project) =='{}'){
		_project={
			status: STATUS.NORMAL
		}
	}
	return db.page({
		sql:'SELECT * FROM Project WHERE ?',
		params:[
			_project
		],
		_offset,
		_pageSize
	})
}

module.exports.getProjectById=(id)=>{
	return db.query({
		sql:'SELECT * FROM Project WHERE ID = ? and status='+ STATUS.NORMAL,
		params:[
			id
		],
	})
}

module.exports.getProjectByUserName=function(_name){
	return db.query({
		sql:'SELECT * FROM Project WHERE NAME = ?',
		params:[
			_name,
		],
	})
}

module.exports.deleteProject=(id)=>{
	return db.query({
		sql:'DELETE FROM Project WHERE ID = ?',
		params:[
			id
		],
	})
}

module.exports.createProject=(_project)=>{
	_user.status=STATUS.NORMAL;
	return db.saveOrUpdate({
		entity:_project,
		table:'Project'
	})
}
