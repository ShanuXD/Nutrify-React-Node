import express, {Request, Response} from "express"
import Meals from "../database/model/meal"
const router = express.Router()

interface MealType{
    userId: string;
    name: string;
    type: string;
    description: string;
    calories: number;
    date:any;
}

// Save Meal
router.post("/meal", async(req:any, res: Response)=>{
    let {type, name, description, calories, date} = req.body
    console.log(req.body)
    const userId = req.id
    date = new Date(date)
    const meal: MealType = {
        userId,
        name,
        type,
        description,
        calories,
        date
    } 
    
    const newMeal = new Meals(meal)
    try{
        await newMeal.save()
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
// Get meal by Date or get all, using querys
router.get("/meal", async (req:any, res: Response)=>{

    const {date} = req.query

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
                userId:req.id
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
// Delete Meal by Id
router.delete("/meal/:id", async (req:Request, res: Response)=>{
    try{
        const meal = await Meals.findByIdAndDelete(req.params.id)
        if(meal){
            return res.json({
                success: true,
                error:"",
                message:"Meal deleted!"
            })
        }else{
            return res.json({
                success: false,
                error:"",
                message:"Id not present!"
            })
        }
        
    }catch(err){
        return res.json({
            success: false,
            error:err,
            message:"Error occur while deleting, check the id!"
        })
    }
    
})
// Get Meal by Id
router.get("/meal/:id", async (req:Request, res: Response)=>{
    try{
        const meal = await Meals.findById(req.params.id)
        if(meal){
            return res.json({
                success: true,
                error:"",
                meal:meal
            })
        }else{
            return res.json({
                success: false,
                error:"Wrong meal id",
                meal:""
            })
        }
        
    }catch(err){
        return res.json({
            success: false,
            error:err,
            meal:""
        })
    }
})
// Update Current Meal
router.put("/meal/:id", async (req:Request, res: Response)=>{

    let meal = await Meals.findById(req.params.id)
    const {name, type, description, calories,} = req.body
    console.log(meal)
    console.log(name, type, description, calories)
    meal.name = name
    meal.type = type
    meal.description = description
    meal.calories = calories
        
    try{
        await meal.save()
        return res.json({
            success: true,
            error:"",
            message:"meal updated!"
        })

    }catch(err){
        return res.json({
            success: false,
            error:err,
            message:"meal not updated!"
        })
    }
    

})


export default router
