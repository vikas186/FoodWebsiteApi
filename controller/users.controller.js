const UserModel = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET_KEY } = require("../utility/config");


exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUserEmail = await UserModel.findOne({ email: email });
    if (existingUserEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const salt = bcrypt.genSaltSync(15);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = await UserModel.create({
      name,
      email,
      password: passwordHash
    });

    res
      .status(201)
      .json({ message: "User signup successfully", user: newUser });
  } catch (error) {
    console.log("Error:", error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(409).json({ message: "Email not found!" });
    }

    const checkPassword = bcrypt.compareSync(password, existingUser.password);
    if (!checkPassword) {
      return res.status(409).json({ message: "Password is wrong!" });
    }

    const token = jwt.sign({ _id: existingUser._id, email: existingUser.email }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "User login successfully", token, user: existingUser });
  } catch (error) {
    console.log("Error:", error);
  }
};