import mongoose from 'mongoose';


const UserSchema = mongoose.Schema({
    admin:{
        type:Boolean,
        default:false
    },
    name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    date: {
        type: Date,
        defualt: Date.now
    },

})

export default mongoose.model('user', UserSchema);