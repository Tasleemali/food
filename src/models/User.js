import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
username:String,
email:String,
address:String ,
password:String ,

})
const User = mongoose.models.users || mongoose.model("users", UserSchema)

export default User;