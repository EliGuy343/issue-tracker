const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    userName:{
        type:String,
        ref:'users'
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

})


module.exports = mongoose.model('issue', IssueSchema);