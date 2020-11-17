import {Router} from 'express';
var router=Router();
//manage
router.get('/manage/user',require('./users'));
router.get('/manage',require('./manage/index'));
//front


module.exports=router;