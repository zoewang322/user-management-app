import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    sex: String,
    age: String,
    password: String
})

var UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;