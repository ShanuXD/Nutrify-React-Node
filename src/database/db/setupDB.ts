import mongoose from "mongoose"

export const connectToDataBase = (url:string)=>{
    mongoose.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    
    const db = mongoose.connection
    
    db.on("error", ()=>{
        console.log("error")
    })
    
    db.once("open", ()=>{
        console.log("Connectd To Database!")
    })
}
