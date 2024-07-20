import getPrismaInstance from "../utils/PrismaClient.js"

export const checkUser=async (req,res,next)=>{
    try{
        const {email}=req.body
        console.log(email)
        if(!email){
            console.log("email is required")
            return res.json({msg:"Email is required",status:false})
        }
        const prisma =getPrismaInstance();
        const user=await prisma.user.findUnique({where:{email}})
        console.log(user,"user")
        if(!user){
            console.log("user not found")
            return res.json(({msg:"User not found ",status:false}))
        }
        else{
            console.log("user found")
            return res.json({msg:"User found",status:true,data:user})
        }
    }catch(error){
        console.log(error)
        next(error)
    }
}