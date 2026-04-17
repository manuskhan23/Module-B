import express from "express";
import mongoose from "mongoose";
import userModel from "./models/userModels.js";
// import { data } from "./data.js"; // optional

const app = express();
const port = 3000;

// ================= MIDDLEWARE =================
app.use(express.json()); // parse JSON body

// ================= DATABASE =================

// Add DB name (IMPORTANT)
const uri =
"YOUR_MONGODB_URI";

// Connect to MongoDB first
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// ================= ROUTES =================

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Server working" });
});

// ================= USER ROUTES =================

// CREATE user
app.post("/createuser", async (req, res) => {
  try {
    const body = req.body;

    const createdUser = await userModel.create(body);

    res.status(201).json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// GET user (placeholder)
app.get("/getuser", async (req, res) => {
  try {
    const users = await userModel.find();

    res.json({
      message: "Users fetched",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE user
app.put("/updateuser/:id", async (req, res) => {
  try {
    const updated = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "User updated",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE user
app.delete("/deleteuser/:id", async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
================ OPTIONAL (YOUR OLD CODE FIXED) =================

Example of filtering users from local data

app.get('/users', (req, res) => {
  let result = data;

  // Filter by ID
  if (req.query.id) {
    result = result.filter(u => u.id === parseInt(req.query.id));
  }

  // Filter by name
  if (req.query.name) {
    result = result.filter(u =>
      u.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
  }

  // Filter by email
  if (req.query.email) {
    result = result.filter(u =>
      u.email.toLowerCase().includes(req.query.email.toLowerCase())
    );
  }

  // Filter by city
  if (req.query.city) {
    result = result.filter(u =>
      u.address.city.toLowerCase().includes(req.query.city.toLowerCase())
    );
  }

  res.json(result);
});


// Get single user by ID
app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  const user = data.find(u => u.id == id);

  res.json(user || { message: "User not found" });
});
*/