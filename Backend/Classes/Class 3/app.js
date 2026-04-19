import express from "express"
import mongoose from "mongoose"
import postModel from "./models/postModel.js"
import dotenv from "dotenv"
import signupModel from "./models/userModel.js"
import bcrypt from "bcrypt"

dotenv.config()

const app=express()

const port=5000

const uri=process.env.MONGODB_URI
// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });


// Middlewares

app.use(express.json())

// Post api

app.post("/api/create-post", async (req,res)=>{
    try {
        const body=req.body

        const saveData=await postModel.create(body)

        res.json(saveData)
    } catch (error) {
        console.log(error);
    }
})

// get api

app.get("/api/posts", async (req,res)=>{
    try {
        // Take All data in database
        // const data=await postModel.find();

        // Take Specific data by key
        // const data=await postModel.find({
        //     title:"title 03"
        // });

        // Take Specific data by id
        const data=await postModel.findById("69e487162a44eec6d96ab2a8");

        res.json(data)

    } catch (error) {
        console.log(error);
    }
})

// update post api

app.put("/api/update-post", async (req,res)=>{
    try {
        const body=req.body
        const updateData=await postModel.findByIdAndUpdate("69e487162a44eec6d96ab2a8", body)
        res.json(updateData)
    } catch (error) {
        console.log(error);
    }
})

// delete post api

app.delete("/api/delete-post", async (req,res)=>{
    try {
        const body=req.body
        const deleteData=await postModel.findByIdAndDelete("69e487162a44eec6d96ab2a8",body)
        res.json(body)
    } catch (error) {
        console.log(error);
    }
})

// from params delete

app.delete("/api/delete-post/:id", async (req,res)=>{
    try {
        const params = req.params.id;
        const deleteData=await postModel.findByIdAndDelete(params)
        res.json(deleteData)
    } catch (error) {
        console.log(error);
    }
})

// Login & Signup api

// signup api

app.post("/api/signup", async (req,res)=>{
    try {

        const { firstName, lastName, email, password } = req.body;

        if(!firstName || !lastName || !email || !password || password.length < 8){
            res.status(404).json({
                message:"Required fields are missing or password is too short"
            })
        }else{
            const emailexist= await signupModel.findOne({email:email})
            console.log(emailexist);
            if(emailexist){
                res.status(404).json({
                    message:"Invalid Email Address or Password"
                })
            }
            const encryptedPassword = await bcrypt.hash(password,10);
            console.log(encryptedPassword);
            let userData = {
                firstName,
                lastName,
                email,
                password: encryptedPassword,
            };
            const user = await signupModel.create(userData);
            res.status(201).json({
                message: "User created successfully",
                data: user
            });
        }
    } catch (error) {
        res.status(503).json({
            message:error,
        })
    }
})

// Create Server

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})