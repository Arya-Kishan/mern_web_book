import { User } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET

export const createUser = async (req, res) => {
    try {
        let checkUser = await User.find({ email: req.body.email });
        if (checkUser != null) {
            return res.status(400).json({ data: null, message: "Email already exist" });
        }
        const user = new User(req.body);
        const newUser = await user.save();
        let jwtToken = jwt.sign({ name: newUser.name, email: newUser.email, userId: newUser._id }, jwtSecret)
        res.set("X-jwt-routes", jwtToken);
        res.status(200).json({ data: newUser, message: "Success" });
    } catch (error) {
        console.log("ERROR IN REGISTERING NEW USER");
        console.log(error);
        res.status(400).json({ data: null, message: "Fail" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user == null) {
            return res.status(400).json({ data: null, message: "NO USER EXIST" });
        }
        let jwtToken = jwt.sign({ name: user.name, email: user.email, userId: user._id }, jwtSecret)
        res.set("X-jwt-routes", jwtToken);
        res.status(200).json({ data: user, message: "Success" });
    } catch (error) {
        console.log("ERROR IN GETTING NEW USER BY EMAIL");
        console.log(error);
        res.status(400).json({ data: null, message: "ERROR IN LOGIN" });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const doc = await User.find();
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting all user");
        res.status(400).json({ data: null, message: error });
    }
}


export const checkUser = async (req, res) => {
    try {
        let data = jwt.verify(req.headers?.['x-jwt-routes'], jwtSecret)
        const doc = await User.findById(data.userId);
        res.status(200).json({ data: doc, message: "Success" });
    } catch (error) {
        console.log("error in getting user");
        console.log(error);
        res.status(400).json({ data: null, message: error });
    }
}