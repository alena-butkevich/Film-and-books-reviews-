var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;
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
        [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

exports.Film = mongoose.model('Film', schema);