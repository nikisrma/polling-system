const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title:{
        type:String,
        default:'',
        required:true
    },
    options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Options' }]
})

const QuestionSchema = mongoose.model('Questions',questionSchema)
module.exports = QuestionSchema