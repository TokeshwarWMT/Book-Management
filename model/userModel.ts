import mongoose from "mongoose";

interface iUser {
    fName: String,
    lName: String,
    mobile: Number,
    email: String,
    password: String,
};

const userSchema = new mongoose.Schema<iUser>({
    fName: String,
    lName: String,
    mobile: Number,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);
export default User;