let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let propertySchema = new Schema({
    propertyType : {
        type : String,
        trim : true,
        unique : true 
    },
    detail : {
        type : String,
        tirm : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
});

let PROPERTYTYPE = mongoose.model('propertyTypes',propertySchema);
module.exports = PROPERTYTYPE;