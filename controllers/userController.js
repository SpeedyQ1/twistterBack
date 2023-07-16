const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new User({ email, password: hash });
  try {
    await User.create(newUser);
    res.status(200).send(newUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email: email });
    console.log(user);
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUserByToken = async (req, res) => {
  try {
    const realId = jwt.verify(req.body.token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: realId.id }).populate("posts");

    if (!user) {
      return res.status(401).json({ message: "not loged in" });
    } else {
      return res.status(202).json({ user });
    }
  } catch (err) {
    res.status(501).send(err);
  }
};
