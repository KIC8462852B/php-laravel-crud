import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../services/authService.js";

//REGISTER

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await registerUser({ username, password });

    const token = jwt.sign({ userId: result._id }, process.env.SECRET_KEY, {
      expiresIn: "10h",
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (error) {
    if (error.message === "Username already exists") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

// LOGIN

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await loginUser(username, password);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10h",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("ERROR - login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
