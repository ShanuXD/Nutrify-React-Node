import express, {Request, Response} from "express"
import {genSaltSync, hashSync, compareSync} from "bcrypt"
import jwt from "jsonwebtoken"
import Users from "../database/model/user"
import dotenv from "dotenv"
import checkAuthentication from "../controllers/checkToken"

dotenv.config()
const router = express.Router()
const secret =  process.env.ACCESS_TOKEN_SECRET as string

interface UserType{
    name: string;
    email: string;
    password: string;
    calories: number;
}

// SignIn Section
   router.post("/", async(req:Request, res:Response)=>{
       const {email, password} = req.body
       const userPresent = await Users.findOne({email:email})
    if(userPresent === null){
        return res.json({
            error:"Email Id not Present, Provide A Valid Email, or SingUp!",
            success:false
        })
    }
    else{
        // Password miss match
        if(!compareSync(password, userPresent.password)){
            return res.json({
                error:"Password is Incorrect!",
                success:false
            })
        }
        // Both Email and Password are valid
        else{
            const id = userPresent.id
            const token = jwt.sign({id}, secret, {
                expiresIn:3000,  //50min
            })

            return res.json({
                error:"",
                success: true,
                token: token
            })
            
        }
    }
})

// SignUp Section
router.post("/signup", async(req:Request, res:Response)=>{
    const {name, email, password, calories} = req.body
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    const user: UserType = {
        name,
        email,
        password:hash,
        calories
    } 
    const checkUserPresent = await Users.find({email:email})
    // console.log(checkUserPresent)
    if(checkUserPresent.length>0){
        return res.json({
            success:false,
            error:"Email Id is already Present, try SignIn!"
        })
    }
    const newUser = new Users(user)
    try{
        newUser.save()
        res.json({
            success:true,
            error:""
        })
    }catch(err){
        res.json({
            success:false,
            error:err
        })
    }
})

// Get Current User
router.get("/user", checkAuthentication, async (req:any, res:Response)=>{
    try{
        const user = await Users.findById(req.id)
        return res.json({
            success:true,
            user:user,
            error:""
        })
        
    }catch(err){
        return res.json({
            success:false,
            user:"",
            error:err
        })
    }

})
// Edit Current User
router.put("/user", checkAuthentication, async (req:any, res:Response)=>{
    const {name, oldPassword, newPassword, calories} = req.body
    try{
        const user = await Users.findById(req.id)
        if(!compareSync(oldPassword, user.password)){
            return res.json({
                error:"Old Password is Incorrect!",
                success:false,
                message:"Unable to update the user"
            })
        }else{

            const salt = genSaltSync(10)
            const hash = hashSync(newPassword, salt)

            user.name = name
            user.password = hash
            user.calories = calories

            await user.save()

            return res.json({
                success:true,
                message:"User updated",
                error:""
            })
        }

        
    }catch(err){
        return res.json({
            success:false,
            user:"Unable to update the user",
            error:err
        })
    }

})




export default router
