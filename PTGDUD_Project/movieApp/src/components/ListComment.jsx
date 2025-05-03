import CommentItem from "./CommentItem";

const comments = [
  { id: 1, username: "quannn", password: "123", comment: "Phim hay lắm!" },
  { id: 2, username: "thanhnga", password: "abc", comment: "Rất cảm động." },
];

function CommentList() {
  return (
    <div>
      {comments.map((item) => (
        <CommentItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CommentList;
