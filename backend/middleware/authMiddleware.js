import jwt from 'jsonwebtoken'

export const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message:"No token provided"
        })
    }
    const token = authHeader.split(" ")[1]
    // console.log(token)
    // console.log(process.env.JWT_KEY)
    try{
        const decode = jwt.verify(token,process.env.JWT_KEY)
        // console.log(decode)
        req.user = decode;
        next()
    }catch (error){
        res.status(400).json({
            message:error.message
        })
    }
}
