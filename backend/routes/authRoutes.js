import express from "express";
import {register,login} from '../controllers/authController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';

const router = express.Router();
router.post("/register",register);
router.post("/login",login);

router.get('/profile',authMiddleware,(req,res)=>{
    const user = req.user
    console.log(user.name)
    console.log(user.email)
    res.json({
        name:user.name,
        email:user.email,
        message:"Welcome to profile"
    })
})

export default router