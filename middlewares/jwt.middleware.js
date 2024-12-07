import  jwt  from "jsonwebtoken";

export const verifyToken = (req,res, next) =>{
    let token = req.headers.authorization
    if(!token){
        return res.status(401).json({msg: "Access denied. No token provided."})
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decoded
            next()
            } catch (err) {
                return res.status(401).json({msg: "Invalid token."})
                }
}