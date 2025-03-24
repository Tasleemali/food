import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
username:String,
email:String,
password:String ,
mobile : Number
})
const User = mongoose.models.auths || mongoose.model("auths", UserSchema)

export default User;