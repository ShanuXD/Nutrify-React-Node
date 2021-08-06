import {Router} from "express"
import checkAuthentication from "../controllers/checkToken"
import usersRoutes from "./usersRoutes"
import mealsRoutes from "./mealsRoutes"
import adminsRoutes from "./admin"


const router = Router()
router.use("/", usersRoutes)
router.use("/user", checkAuthentication, mealsRoutes)
router.use("/admin", adminsRoutes)

export default router
