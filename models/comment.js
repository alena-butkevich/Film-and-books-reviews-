var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;
var schema = new Schema({
    _creator : {
        type: String,
        ref: 'Film'
    },
    text:{
        type:String,
        required:true
    },
    score: {
        type: Number
    },
    date:{
        type:Date
    }
});

exports.Comment = mongoose.model('Comment', schema);