import express, {Request, Response} from "express"
import {genSaltSync, hashSync, compareSync} from "bcrypt"
import checkAuthenticationAdmin from "../controllers/checkTokenAdmin"
import jwt from "jsonwebtoken"
import Admin from "../database/model/admin"
import User from "../database/model/user"
import Meals from "../database/model/meal"
import dotenv from "dotenv"

dotenv.config()
const router = express.Router()
const secret =  process.env.ACCESS_TOKEN_SECRET as string

// SignIn Admin
   router.post("/", async(req:Request, res:Response)=>{
       const {email, password} = req.body
       const userPresent = await Admin.findOne({email:email})
       console.log(userPresent)
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

// SignUp Admin
router.post("/signup", (req:Request, res:Response)=>{
    const {name, email, password} = req.body
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    const user = {
        name,
        email,
        password:hash,
    } 
    const newAdmin = new Admin(user)
    try{
        newAdmin.save()
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

router.get("/allusers", checkAuthenticationAdmin, async(req:Request, res:Response)=>{
    try{
        const allUsers = await User.find()
        res.json({
            success:true,
            users:allUsers,
            error:""
        })
    }catch(err){
        res.json({
            success:true,
            users:[],
            error:err
        })
    }

})
router.delete("/deleteuser/:id", checkAuthenticationAdmin, async(req:Request, res:Response)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(user){
            res.json({
                success:true,
                message:"User Deleted",
                error:""
            })

        }else{
            res.json({
                success:false,
                message:"User Id Not Present",
                error:""
            })
        }
        
    }catch(err){
        res.json({
            success:false,
            message:"User Not Deleted",
            error:err
        })
    }

})

// Edit  Users
router.put("/user/edit", checkAuthenticationAdmin, async (req:any, res:Response)=>{
    const {name, calories, id} = req.body
    // console.log(name, calories, id)
    try{
        const user = await User.findById(id)
        user.name = name
        user.calories = calories
        await user.save()

        return res.json({
            success:true,
            message:"User updated by admin",
            error:""
        })

        
    }catch(err){
        return res.json({
            success:false,
            user:"Unable to update the user",
            error:err
        })
    }

})

// Get meal by Date or get all, using querys
router.post("/meal", async (req:any, res: Response)=>{
    const {date, id} = req.body
    if(date){
        let [year, month, day] = date.split("-")
        year = Number(year)
        month = Number(month)-1
        day = Number(day)
        
        try{
            const mealsByDate = await Meals.find({
                date:{
                    $gte: new Date(year, month, day), 
                    $lt: new Date(year, month, day+1)
                },
                userId:id
            })
    
            return res.json({
                success:true,
                error:"",
                meals:mealsByDate})
        }catch(err){
            return res.json({
                success:false,
                error:err,
                meals:[]})
        }
    }
     try{
        const meals = await Meals.find()
        return res.json({
           success:true,
           error:"",
           meals:meals})

     }catch(err){
        return res.json({
            success:false,
            error:err,
            meals:[]})
     }
})



export default router
