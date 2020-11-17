/**
 * 返回实体
 */

function entityResponse(){
	if(arguments.length==0){
		console.error('需要传入参数')
		return 
	}else if(arguments.length==1){
		return {
			status:arguments[0],
		}
	}else if(arguments.length==2){
		return {
			status:arguments[0],
			message:arguments[1]
		}
	}else{
		return {
			status:arguments[0],
			message:arguments[1],
			data:arguments[2]
		}
	}
}
module.exports=entityResponse;