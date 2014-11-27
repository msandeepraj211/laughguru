var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var question = mongoose.model('questions');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/test/:sub',function(req,res){
	question.find({subject:req.params.sub}).exec(function(err,ques){
		if(err){
			console.log('error occued while querying questions of subject');
			console.log(err);
		}else{
			res.json(ques);
		}
	})
});

/*router.get('/create', function(req, res) {
	var q={
	    "choices" : [
	        {
	            value: "Group",
	            answer:false
	        },
	        {
	            value: "Flock",
	            answer:false
	        },
	        {
	            value: "Pairs",
	            answer:false
	        },
	        {
	            value: "Herd",
	            answer:true
	        }
	    ],
	    "question" : "A _____ of cattle",
	    "subject" : "English",
	    "qNumber":3
	}
	question.create(q,function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log('data saved')
		}
	})
});*/

module.exports = router;
