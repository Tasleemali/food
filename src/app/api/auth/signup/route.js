import { authDB } from "@/database/authDB";
import User from "@/models/User";;
import bcrypt from 'bcryptjs'



export async function POST(req) {
    try {
        await authDB()
        const {username ,email ,password , address } =  await req.json()
         const existingUser = await User.findOne({email})
    if(existingUser){
        return Response.json({message:'this eamil already exist plz try another email'} , {status:400})

    }
    const hashpassword = await bcrypt.hash(password ,10)
    const newUser = await new User({username ,email , address, password:hashpassword});
         await newUser.save() 

        return Response.json({message:'signup Successful'} , {status:201}) 
        
    } catch (error) {
         return Response.json({message: "server error"}, {status:500})
    }
    
}