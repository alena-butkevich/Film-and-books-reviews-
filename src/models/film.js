var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;
var commentSchema = new Schema({
    _creator : {
        type: Schema.Types.ObjectId, ref: 'Film'
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
var schema = new Schema({
    name:{
        type:String,
        required:true
    },
    annotation:{
        type:String
    },
    year:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    rating:{
        type:[Number]
    },
    comments:
        [commentSchema]
});

exports.Film = mongoose.model('Film', schema);