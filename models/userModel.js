const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require: [true,'Please add your name'],
        trim: true,
    },
    email:{
        type:String,
        require:[true,'Please add your email'],
        unique:true,
        trim:true,
    },
    mobileNo:{
        type:String,
        require:[true, 'Please add you mobileNo'],
        min:10,
        max:12,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        require:[true,'Please add your password'],
        min: 6,
        max: 64,
    },
    role:{
        type:String,
        default:'user',
    },
   },
    {timestamps:true}
);

module.exports = mongoose.model('user',userSchema)