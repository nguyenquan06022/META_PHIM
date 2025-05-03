const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    gg_id: {
      type: String,
      default: "",
    },
    avt: {
      type: String,
      default: "/avatar/01.jpg",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

module.exports = mongoose.model("Users", UserModel);
