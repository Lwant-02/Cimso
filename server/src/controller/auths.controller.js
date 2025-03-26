import bcryptjs from "bcryptjs";
import { generateToken } from "../lib/generateToken.js";
import { User } from "../model/auth.model.js";
import { defaultAva } from "../lib/constant.js";

//Register function
export async function Register(req, res) {
  const { fullName, email, password, phone } = req.body;

  try {
    //Fitst check all fields have data
    if (!email || !fullName || !password || !phone) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    //Then check the password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters!" });
    }
    //Then check user is already exist or not
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({ message: "User already exist!" });
    }
    //Then we hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    //We create new users
    const newUser = await User.create({
      fullName,
      email,
      phone,
      password: hashPassword,
      profilePic: defaultAva,
    });
    if (newUser) {
      //We create token here
      generateToken(newUser._id, res);
      //Then we send the data to the client
      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.log("Invalid user data", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
}

//Login function
export async function Login(req, res) {
  const { email, password } = req.body;
  try {
    //Check all fields have data
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    //Check if user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found with this email!" });
    }

    //If user exist then we compare the password
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password does not match!" });
    }

    //If password match then we create token
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Invalid user data", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
}

//Login with Google function
export async function LoginWithGoogle(req, res) {
  const { email, fullName, profilePic } = req.body;
  try {
    //First check user is already exist or not
    const userAlreadyExist = await User.findOne({ email });
    if (!userAlreadyExist) {
      //If user is not exist then we create new user
      const newUser = await User.create({
        fullName,
        email,
        profilePic,
        password: "google-login",
        phone: "",
      });
      if (newUser) {
        //Then we create token
        generateToken(newUser._id, res);
        res.status(200).json({
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic || defaultAva,
          phone: newUser.phone,
        });
      }
    }
    if (userAlreadyExist) {
      generateToken(userAlreadyExist._id, res);
      res.status(200).json({
        fullName: userAlreadyExist.fullName,
        email: userAlreadyExist.email,
        profilePic: userAlreadyExist.profilePic,
        phone: userAlreadyExist.phone,
      });
    }
  } catch (error) {
    console.log("Error in loggin user with google:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
}

//Logout function
export function Logout(req, res) {
  try {
    res.clearCookie("supersecret");
    res.status(200).json({ message: "Logout successfully!" });
  } catch (error) {
    console.log("Can not logout the user:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
}

//Update profile pic function
export async function UpdateAccount(req, res) {
  try {
    const userId = req.user._id;
    const { profilePic, fullName, email, phone } = req.body;
    // Update the user profile
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic,
        fullName: fullName || undefined,
        email: email || undefined,
        phone: phone || undefined,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    console.log("Can not update the profile:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
}

//CheckAuth function
export function CheckAuth(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in CheckAuth controller:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export const CheckUserExist = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ message: "User exists!", success: true });
    } else {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }
  } catch (error) {
    console.log("Error in CheckUserExist controller:", error.message);
    res.status(500).json({ message: "Internal server error!", success: false });
  }
};
