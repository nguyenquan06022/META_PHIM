const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema({
  account_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  avt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
  },
});

comment.pre("save", function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }
  next();
});

const CommentModel = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
    listComment: [comment],
  },
  { collection: "Comments" }
);
module.exports = mongoose.model("Comments", CommentModel);
