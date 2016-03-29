var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;
var schema = new Schema({
    name:{
        type:String,
        required:true
    },
    kind:{
        type:String,
        required:true
    },
    text:{
        type:String
    }
});

exports.Item = mongoose.model('Item', schema);