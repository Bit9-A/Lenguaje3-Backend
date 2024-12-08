import  jwt  from "jsonwebtoken";

export const verifyToken = (req,res, next) =>{
    let token = req.headers.authorization
    if(!token) return res.status(401).send({message: "No token provided"
        })
        token = token.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(403).send({ message: "Token is invalid"
                })
                req.user = user
                next()
                })
                }
    
