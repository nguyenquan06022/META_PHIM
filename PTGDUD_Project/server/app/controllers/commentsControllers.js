const Comments = require("../models/CommentModel");

class CommentsControllers {
  getCommentsByLink(req, res, next) {
    const link = req.query.link;
    Comments.findOne({ link: link })
      .then((data) => {
        if (!data) {
          const newCommentDoc = new Comments({
            link: link,
            listComment: [],
          });

          return newCommentDoc.save().then((savedDoc) => {
            res
              .status(201)
              .json({ message: "created new comment list", data: savedDoc });
          });
        } else {
          return res.status(200).json({ message: "success", data: data });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  addComment(req, res, next) {
    const { link, account_id, avt, content, username } = req.body;

    if (!link || !account_id || !avt || !content || !username) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newComment = {
      account_id,
      username,
      avt,
      content,
      createdAt: new Date(),
      isDelete: false,
    };

    Comments.findOne({ link })
      .then((doc) => {
        if (!doc) {
          const newDoc = new Comments({
            link,
            listComment: [newComment], // Trường hợp tạo mới, chỉ có 1 phần tử nên giữ nguyên
          });
          return newDoc.save();
        } else {
          doc.listComment.unshift(newComment); // Thêm vào đầu danh sách
          return doc.save();
        }
      })
      .then((saved) => {
        res
          .status(200)
          .json({ message: "Comment added at beginning", data: saved });
      })
      .catch(next);
  }

  editComment = (req, res, next) => {
    const { link, account_id, comment_id, content, username } = req.body;

    if (!link || !account_id || !comment_id || !content || !username) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    Comments.findOne({ link })
      .then((doc) => {
        if (!doc) {
          return res
            .status(404)
            .json({ message: "Comment not found for the provided link" });
        }

        const comment = doc.listComment.find(
          (comment) =>
            comment.id === comment_id && comment.account_id === account_id
        );

        if (!comment) {
          return res.status(404).json({
            message:
              "Comment not found or you are not authorized to edit this comment",
          });
        }

        comment.content = content;

        return doc.save();
      })
      .then((saved) => {
        res
          .status(200)
          .json({ message: "Comment updated successfully", data: saved });
      })
      .catch(next);
  };

  deleteComment = (req, res, next) => {
    const { link, account_id, comment_id } = req.body;
    if (!link || !account_id || !comment_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    Comments.findOne({ link })
      .then((doc) => {
        if (!doc) {
          return res
            .status(404)
            .json({ message: "No comments found for the provided link" });
        }
        const comment = doc.listComment.find(
          (comment) =>
            comment.id === comment_id && comment.account_id === account_id
        );
        if (!comment) {
          return res.status(404).json({
            message:
              "Comment not found or you are not authorized to delete this comment",
          });
        }
        comment.isDelete = true;
        return doc.save();
      })
      .then((saved) => {
        res
          .status(200)
          .json({ message: "Comment deleted successfully", data: saved });
      })
      .catch(next);
  };
}

module.exports = new CommentsControllers();
