const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    userName:{
        type:String,
        ref:'users',
        required:true
    },
    name: {
        type:String,
        required: true
    },
    category: {
        type:String,
        required:true
    },
    date: {
        type: Date, 
        defualt: Date.now
    },
    fix :{
        type:mongoose.Schema.Types.ObjectID,
        ref:'fixes',
        default:null
    }
})


module.exports = mongoose.model('issue', IssueSchema);