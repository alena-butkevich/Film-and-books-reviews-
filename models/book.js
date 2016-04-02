var mongoose = require('libs/mongoose'),
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
    comment:
        [{type: Schema.Types.ObjectId, ref: 'Story'}]
});

exports.Film = mongoose.model('Film', schema);