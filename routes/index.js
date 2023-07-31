const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const validator = require('../validator/validate');

router.get('/',(req,res)=>{
    res.render('index')
})
router.post('/questions/create',validator.ValidateQuestion, homeController.createQuestion);
router.post('/questions/:id/options/create', validator.validateOption,homeController.createOption);
router.get('/questions/list', homeController.getQuestionList);
router.get('/options/list', homeController.getOptionList);
router.get('/questions/:id/delete',validator.validateQuestionId, homeController.deleteQuestion);
router.get('/options/:id/delete', validator.validateOptionId,homeController.deleteOption);
router.get('/options/:id/add_vote',validator.validateOptionId, homeController.addVote);
router.get('/questions/:id',validator.validateQuestionId, homeController.viewQuestion);


module.exports = router;