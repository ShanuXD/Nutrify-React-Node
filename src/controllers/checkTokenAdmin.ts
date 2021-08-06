import  {Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const secret =  process.env.ACCESS_TOKEN_SECRET as string

const checkAuthenticationAdmin = (req:any, res:Response, next:NextFunction)=>{
    let token
    const cookies = req.headers["cookie"] === undefined ||null?
        "":
        req.headers["cookie"].split(";")

    for(let i=0; i<cookies.length; i++){
        let cookie = cookies[i].split("=")
        let key = cookie[0].trim()
        let value = cookie[1]
        if(key === 'admin-token'){
            token = value
        }
    }

    if(!token){
        return res.json({
            success: false,
            error:"No token present",
            auth:false
        })
    }else{
        jwt.verify(token, secret, (err:any, decode:any)=>{
            if(err){
                return res.json({
                    success: false,
                    error:`Auth fail, token didn't match! error:${err}`,
                    auth:false
                })
            }
            req.id = decode.id
            next()

        })
    }
}

export default checkAuthenticationAdmin