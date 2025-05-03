import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const CommentItem = ({ item }) => {
  const { username, comment } = item;

  return (
    <Card
      className="mb-4 p-3 border-0 shadow-sm"
      style={{
        borderRadius: "20px",
        backgroundColor: "#ffffff",
      }}
    >
      <Row className="align-items-start">
        <Col xs="auto">
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#e9ecef",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "#6c757d",
            }}
          >
            <FaUserCircle />
          </div>
        </Col>
        <Col>
          <div>
            <strong className="text-dark">@{username}</strong>
            <p
              className="text-muted mt-1 mb-0"
              style={{ whiteSpace: "pre-line", fontSize: "0.95rem" }}
            >
              {comment}
            </p>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CommentItem;
