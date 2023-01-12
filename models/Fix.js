import mongoose from 'mongoose';

const FixSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    userName:{
        type:String,
        ref:'users'
    },
    issue: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'issues'
    },
    solution: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        defualt: Date.now
    },

})

export default mongoose.model('fix', FixSchema);