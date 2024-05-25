const express=require('express');
const router=express.Router();

const {signup, login, logout, getProfile, updateProfile}=require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports=router;