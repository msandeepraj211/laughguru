var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    "choices" : [
        {
            value: {type:String, required:true},
            answer:{type:Boolean, default:false}
        }
    ],
    "question" : {type:String, required:true},
    "subject" : {type:String, required:true},
    "qNumber":{type:Number,required:false}
});

mongoose.model('questions', QuestionSchema,'questions');