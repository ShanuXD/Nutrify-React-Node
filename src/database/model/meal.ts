import {Schema, model} from "mongoose"

const mealSchema = new Schema({

    userId:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,

    },
    calories:{
        type:Number,
        required: true
    },
    date:{
        type: Date,
        required:true
    },
    time:{
        type:Date,
        deafault: Date.now()
    }
})

export default model("Meal", mealSchema)
