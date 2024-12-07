import { UserModel } from "../models/users.model.js";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";

const register = async(req,res) => {
    try{
        console.log(req.body)
        const { name, email, password, phone, address, username, status } = req.body
        
        if (!username || !email || !password){
            return res.status(400).json({message: "Please fill in all fields."})
        }

        const user = await UserModel.findByEmail(email)
        if(user) return res.status(400).json({message: "Email already exists"})

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await UserModel.create({ name, email, password:hashedPassword, phone, address, username, status })

        const token = jwt.sign({
            email:newUser.email
        },
        process.env.SECRET_KEY, 
        { expiresIn: '1h' }
    )

        return res.status(201).json({
            ok:true,
            token
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error Server'
        })
    }
}
const login = async(req,res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await UserModel.findByEmail(email);
        
        if (!user) {
            return res.status(400).json({ message: "User not registered" });
        }

        console.log("User found:", user);

        if (!user.password) {
            console.error("User password is missing for email:", email);
            return res.status(400).json({ message: "Invalid user data: password missing" });
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Email or password is invalid" });
        }

        const token = jwt.sign(
            { email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
}

const profile = async(req,res) =>{
    try {
        const user = await UserModel.findByEmail(email)
        

    }
    catch{
        return res.status(500).json({
            ok: false,
            msg: 'Server Error'
    })
}
}

export const UserController = {
    register,
    login,
    profile
}