import express, {Application, urlencoded, json} from "express"
import  {connectToDataBase} from "./database/db/setupDB"
import allRoutes from "./routes/index"
import cors from "cors"
import path from "path"
import dotenv from "dotenv"
dotenv.config()

const app: Application = express()
const URL = process.env.DATABASE_URL as string
const LocalDB = "mongodb://localhost:27017/NutrifyApp"
connectToDataBase(URL)

app.use(cors())
app.use(urlencoded({extended: true }))
app.use(json())
// Use Routes
app.use(allRoutes)

// Use Static Assets If In Production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }


app.listen(process.env.PORT || 5000, ()=> console.log("server is running!"))