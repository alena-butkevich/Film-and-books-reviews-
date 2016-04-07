var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;
var schema = new Schema({
    name:{
        type:String,
        required:true
    },
    annotation:{
        type:String,
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    rating:{
        type: [Number]
    },
    comments:
        [{type: Schema.Types.ObjectId, ref: 'Story'}]
});

exports.Book = mongoose.model('Book', schema);