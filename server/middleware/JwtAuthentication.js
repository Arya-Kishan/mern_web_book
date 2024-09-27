import { User } from "../models/userModel.js"
import jwt from 'jsonwebtoken'

export const jwtAuthenticateUser = async (req, res, next) => {

    try {

        const jwtToken = req?.headers["x-webbook-jwt-routes"];

        const verfiyToken = jwt.verify(jwtToken, process.env.JWT_SECRET)

        const { userId } = verfiyToken;

        const user = await User.findById(userId)

        if (user) {
            next()
        } else {
            res.status(400).json("ERROR IN JWT AUTHENTICATION")
        }

    } catch (error) {
        console.log(error);
        res.status(400).json("ERROR IN JWT AUTHENTICATION")
    }

}