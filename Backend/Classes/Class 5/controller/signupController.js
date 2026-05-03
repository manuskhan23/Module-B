import signupModel from "../models/userModel.js";
import bcrypt from "bcrypt";

const signupController = async (req, res) => {
    try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Required fields are missing..."
      });
    }

    console.log("Checking email:", email);
    const emailExist = await signupModel.findOne({ email });
    console.log("Email found:", emailExist);

    if (emailExist) {
      return res.status(409).json({
        message: "Email already exists.."
      });
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const userObj = {
      firstName,
      lastName,
      email,
      password: encryptPassword
    };

    const saveData = await signupModel.create(userObj);

    res.status(201).json({
      message: "User created successfully",
      status: true,
      saveData
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export default signupController