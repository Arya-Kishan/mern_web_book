import { User } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { sendMail } from '../services/NodeMailer.js';
import { getNewUserNotificationHtml, signUpTemplate } from '../services/Template.js';
import AsyncHandler from '../utilis/AsyncHandler.js';
const jwtSecret = process.env.JWT_SECRET

export const createUser = AsyncHandler(async (req, res) => {
    let checkUser = await User.find({ email: req.body.email });
    console.log(checkUser);
    console.log(checkUser.length);
    if (checkUser.length > 0) {
        return res.status(400).json({ data: null, message: "Email already exist" });
    }
    const user = new User(req.body);
    const newUser = await user.save();
    let jwtToken = jwt.sign({ name: newUser.name, email: newUser.email, userId: newUser._id }, jwtSecret)
    res.set("x-webbook-jwt-routes", jwtToken);
    res.status(200).json({ data: newUser, message: "Success" });
    await sendMail("arya12345kishan@gmail.com", "New User Join WebBook", `${newUser.name}`, getNewUserNotificationHtml(newUser.name, newUser.email))
    await sendMail(newUser.email, "Joined WebBook", `${newUser.name}`, signUpTemplate(newUser.name));
}, "error in registering user")

export const loginUser = AsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user == null) {
        return res.status(400).json({ data: null, message: "NO USER EXIST" });
    }
    let jwtToken = jwt.sign({ name: user.name, email: user.email, userId: user._id }, jwtSecret)
    res.set("x-webbook-jwt-routes", jwtToken);
    res.status(200).json({ data: user, message: "Success" });
}, "error in login user")

export const getAllUser = AsyncHandler(async (req, res) => {
    const doc = await User.find();
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all user")


export const checkUser = AsyncHandler(async (req, res, next) => {
    let data = jwt.verify(req.headers?.['x-webbook-jwt-routes'], jwtSecret)
    const doc = await User.findById(data.userId);
    res.status(200).json({ data: doc, message: "Success" });
}, "ERROR IN VERIFYING GUEST USER")