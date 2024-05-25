const bcrypt=require('bcryptjs');
const User=require('../Models/UserModel');
const generateToken=require('../utils/generateToken');

const signup = async (req, res) => {
    try {
        const { Name, Email, Phone, Password} = req.body;

        const user = await User.findOne({ Email });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newUser = new User({
            Name,
            Email,
            Phone,
            Password: hashedPassword,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                Name: newUser.Name,
                Email: newUser.Email,
                Password: newUser.Password,
                token: generateToken(newUser._id)
            });
        } else {
            res.status(400).json({ error: "Invalid User" });
        }
    } catch (error) {
        console.log("Error in signing up", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const login=async(req, res)=>{
    try{
        const {Email, Password}=req.body;
        const user=await User.findOne({Email});
        const ispwdcrct=await bcrypt.compare(Password, user?.Password || "");

    if(!user || !ispwdcrct){
        return res.status(401).json({error:"Enter Valid Credentials"});
    }

    res.status(201).json({
        _id:user._id,
        Name:user.Name,
        Email:user.Email,
        Phone:user.Phone,
        token: generateToken(user._id)
    })

    }catch(error){
        console.log("Error in logging in");
        res.status(500).json({error:"Internal Server Error"});
    }

}

const logout=async(req, res)=>{
    try{
        res.cookie("jwt", "",{maxAge:0});
        res.status(201).json({message:"Logged Out Successfully"});
    }catch(error){
        console.log("Error in logging out");
        res.status(500).json({error:"Internal Server Error"});
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateProfile = async (req, res) => {
    const { linkedin, github } = req.body;
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        user.linkedin = linkedin || user.linkedin;
        user.github = github || user.github;
        if (req.file) {
            user.profileImage.data = fs.readFileSync(req.file.path);
            user.profileImage.contentType = req.file.mimetype;
        }
        await user.save();
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { signup, login, logout, getProfile, updateProfile };