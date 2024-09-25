import { User } from "../models/userModel.js"
import jwt from 'jsonwebtoken'

console.log(process.env.JWT_SECRET);

export const jwtAuthenticateUser = async (req, res, next) => {

    console.log("----verify routes with jwt token----");

    try {
        console.log(req?.headers);
        console.log(req?.headers["x-webbook-jwt-routes"]);

        const jwtToken = req?.headers["x-webbook-jwt-routes"];

        const verfiyToken = jwt.verify(jwtToken, process.env.JWT_SECRET)
        console.log(verfiyToken);


        const { userId } = verfiyToken;
        console.log(userId);

        const user = await User.findById(userId)
        console.log(user);

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