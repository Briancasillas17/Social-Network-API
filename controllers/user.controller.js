const { User } = require("../models");
const { db } = require("../models/User");

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //get a sigle user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user is found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //create a user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //update user by ID
  updateUser({ params, body }, res ) {
      User.findOneAndUpdate({ _id: params.id}, body, { new: true , runValidators: true })
      .then(dbUserData => {
          if(!dbUserData) {
              res.status(404).json({ message: "No user found with that id"});
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  //delete user and thoughts
  deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id})
      .then(dbUserData => {
          if(!dbUserData) {
              res.status(404).json({ message: "No user found with that id"});
              return;
          }
          res.json(dbUserData)
      })
      .catch(err => res.status(400).json(err));
  },

};

module.exports = userController;