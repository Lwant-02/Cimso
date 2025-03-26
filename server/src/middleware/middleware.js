import jwt from "jsonwebtoken";
import { User } from "../model/auth.model.js";

export const Middleware = async (req, res, next) => {
  try {
    const token = req.cookies.supersecret;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized-No token provided!" });

    //Decode the token back
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized-Invalid token!" });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ message: "User not fuound!" });

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protectRoute middleware:${error.message}`);
    res.status(500).json({ message: "Internal server error!" });
  }
};
