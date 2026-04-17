import mongoose from 'mongoose';

const userSchema =mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
})

const userModel=mongoose.model('user',userSchema)

export default userModel;
