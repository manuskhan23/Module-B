import postModel from "../models/postModel.js";

const createPost = async (req, res) => {
  try {
    const saveData = await postModel.create(req.body);
    res.status(201).json(saveData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const getData = await postModel.find({ post_title: "title 01" });
    res.json(getData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    await postModel.findByIdAndUpdate(req.params.id, req.body);
    res.json("data updated successfully...");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await postModel.findByIdAndDelete(req.params.id);
    res.json("data deleted successfully...");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createPost, getPost, updatePost, deletePost };