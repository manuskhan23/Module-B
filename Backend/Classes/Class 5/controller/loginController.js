import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import signupModel from "../models/userModel.js";

const loginController = async (req, res) => {
    try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Required fields are missing"
      });
    }

    const user = await signupModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // ✅ FIXED: no password in token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET_KEY,
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export default loginController;