// "use server"

// import { authDB } from "@/database/authDB"
// import User from "@/models/User";
// import bcryptjs from "bcryptjs"
// import jwt from 'jsonwebtoken'

// import { cookies } from "next/headers";
// // signup 
// export async function SinupAction(formData) {
// await authDB()
//     try {
//         const {username ,email ,password} = formData;
//         const checkUser = await User.findOne({email})
//         if(checkUser){
//             return{
//                 success:false,
//                 message:"this user email already exist plz try again"
//             }
//         }

//            const salt = await bcryptjs.genSalt(10)
//            const hashpassword = await bcryptjs.hash(password ,salt)
//             const newUser = new User({username ,email , password: hashpassword})
//             const saveUser = await newUser.save()
//             if(saveUser){
//                 return{
//                     success:true,
//                     message:JSON.parse(JSON.stringify(saveUser))
//                 }
//             }

//     } catch (error) {
//         console.log('error found')
//         return{
//             success:false,
//             message:'erorr'
//         }
//     }
    
// }

// // login

// export async function loginAction(formData) {
// await authDB()
//     try {
//          const  {email ,password} = formData;
//          const checkUser = await User.findOne({email})
//         if(!checkUser){
//             return{
//                 success:false,
//                 message:'this email is incorrect plz try with diffrent email'
//             }  
//         }
           
//         const checkpassword = await bcryptjs.compare(password , checkUser.password)
          
//         if (!checkpassword) {
//             return {
//                 success: false,
//                 message: "password is incorrect pl try again"
//             }
//         }

//         const createtedToken = {
//             id:checkUser._id,
//             username:checkUser.username,
//             email:checkUser.email,
//             password:checkUser.password
//         }

//         const token =  jwt.sign(createtedToken , "DEFAULT_KEY", { expiresIn: "1d" } )
//  const getCookies = cookies()
//  getCookies.set("token" , token)
//  console.log("token not geting", getCookies)
// return{
//     success:true,
//     message:'login successful'
// }




//     } catch (error) {
//         console.log('error found')
//         return{
//             success:false,
//             message:'erorr'
//         }
    
//     }
    
// }

// export async function  logoutAction() {
// await authDB()
//     try {
//            const getCookies = cookies()
//            getCookies.get('token','')
//                return{
                
//                 success:true,
//                 message:"logout successful"
//                }


//     } catch (error) {
//         console.log('error found')
//         return{
//             success:false,
//             message:'erorr'
//         }
//     }
    
// }

// export async function getloginUser() {
//    await authDB() 
//     try { 

//         const getCookies = cookies()
//     const token = getCookies.get('token')?.value || ''

// if(token=== ''){
//     return{
//         success:false,
//         message:'token is empty'
//     }

// }

// const decodedToken = jwt.verify(token , "DEFAULT_KEY")
// const getUserinfo = await User.findOne({_id: decodedToken.id})
// if(getUserinfo){
//     return{
//         success:true,
//         data:JSON.parse(JSON.stringify(getUserinfo))
//     }
// }else{

//     return{
//         success:false,
//         message:'user not found'
//     }
// }



//     } catch (error) {
//         console.log("user not getting")
//         return{
//             success:false,
//             message:'getting error'
//         }
//     }
    
// }