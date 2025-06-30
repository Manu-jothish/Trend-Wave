import asyncHandler from "../middleware/asyncHandler.js";
import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;
  let salt = await bcrypt.genSalt(10);
  let encryptedPassword = await bcrypt.hash(password, salt);
  let existingUser = await Users.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({ message: "user alredy exist" });
  }

  const user = await Users.create({
    name,
    email,
    password: encryptedPassword,
  });

  res.status(201).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  let user = await Users.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    generateToken(user._id, res);

    res.status(200).json({
      name: user.name,
      email: user.email,
      _id: user._id,
      isAdmin:user.isAdmin
    });
  } else {
    res.status(500).json({ message: "incorrect email or password" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ mesage: "logout success" });
});

export { registerUser, loginUser, logoutUser };
