import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  //First we create token by user
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  //Then we send back the cookie
  res.cookie("supersecret", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", //prevent CSRF attacks cross-site request forgey attacks
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
