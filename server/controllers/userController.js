import { User } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { sendMail } from '../services/NodeMailer.js';
import { getNewUserNotificationHtml, signUpTemplate } from '../services/Template.js';
import AsyncHandler from '../utilis/AsyncHandler.js';
const jwtSecret = process.env.JWT_SECRET

export const createUser = AsyncHandler(async (req, res) => {
    let checkUser = await User.find({ email: req.body.email });
    if (checkUser.length > 0) {
        return res.status(400).json({ data: null, message: "Email already exist" });
    }
    const newUser = await User.create(req.body);
    let jwtToken = jwt.sign({ name: newUser.name, email: newUser.email, userId: newUser._id }, jwtSecret)
    res.set("x-webbook-jwt-routes", jwtToken);
    res.status(200).json({ data: sanitiseResponse(newUser), message: "Success" });

    await sendMail("arya12345kishan@gmail.com", "New User Join WebBook", `${newUser.name}`, getNewUserNotificationHtml(newUser.name, newUser.email))

    await sendMail(newUser.email, "Joined WebBook", `${newUser.name}`, signUpTemplate(newUser.name));

}, "error in registering user or sending mail")

export const loginUser = AsyncHandler(async (req, res) => {
    // finding and updating users online time
    const user = await User.findOneAndUpdate({ email: req.body.email }, { online: String(Date.now()) }, { new: true });
    if (user == null) {
        return res.status(400).json({ data: null, message: "NO USER EXIST" });
    }
    let jwtToken = jwt.sign({ name: user.name, email: user.email, userId: user._id }, jwtSecret)
    res.set("x-webbook-jwt-routes", jwtToken);

    if (req.body.loginThrough == "google") {
        return res.status(200).json({ data: sanitiseResponse(user), message: "Success" });
    } else {
        if (req.body.password == user.password) {
            return res.status(200).json({ data: sanitiseResponse(user), message: "Success" });
        } else {
            return res.status(400).json({ data: null, message: "WRONG PASSWORD" });
        }
    }
}, "error in login user")

export const getAllUser = AsyncHandler(async (req, res) => {

    if (req.query.search) {
        const doc = await User.find({ name: { $regex: '^' + req.query.search, $options: 'i' } });
        res.status(200).json({ data: doc, message: "Success" });
        return true;
    }

    const doc = await User.find();
    res.status(200).json({ data: doc, message: "Success" });
}, "error in getting all user")

export const getSingleUser = AsyncHandler(async (req, res) => {
    const doc = await User.findById(req.params.userId);
    res.status(200).json({ data: sanitiseResponse(doc), message: "Success" });
}, "error in getting single user")

export const updateUser = AsyncHandler(async (req, res) => {
    const doc = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: sanitiseResponse(doc), message: "Success" });
}, 'error in updating task')


export const checkUser = AsyncHandler(async (req, res, next) => {
    let data = jwt.verify(req.headers?.['x-webbook-jwt-routes'], jwtSecret)
    const doc = await User.findById(data.userId);
    res.status(200).json({ data: sanitiseResponse(doc), message: "Success" });
}, "ERROR IN VERIFYING GUEST USER")


const sanitiseResponse = (user) => {
    let updatedUser = { _id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt, FCMtoken: { deviceToken: user.FCMtoken.deviceToken, pushPermission: user.FCMtoken.pushPermission }, online: user.online }
    return updatedUser;
}