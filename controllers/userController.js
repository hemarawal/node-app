const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All perameters required...");
  }
  const userAvailble = await User.findOne({ email });
  if (userAvailble) {
    res.status(400);
    throw new Error("User with same email already exists..");
  } else {
    // Hashed Password:
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(201).render("home");
    } else {
      res.status(400);
      throw new Error("User data is not valid...");
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    res.status(400);
    throw new Error("All perameters required...");
  }
  const user = await User.findOne({ email });
  if (user) {
    console.log("user exists...")
    isPasswordMatched = await bcrypt.compare(password, user.password);
    if (isPasswordMatched) {
      console.log("password-matched..")
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "15m" }
      );
      res.status(200).redirect("/api/contacts");
    }
  } else {
    res.status(401);
    throw new Error("Email or password is not valid...");
  }
});

// Access is private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
