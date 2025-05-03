import { Card, Row, Col, Image, Dropdown } from "react-bootstrap"
import avatar from "/avatar/avtD.png" // Thay bằng hình của bạn

export default function FilmSummary() {
  // Custom styles for dark theme
  const cardStyle = {
    backgroundColor: "#1e2329",
    color: "#e2e8f0",
    border: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }

  const primaryTextStyle = {
    color: "#8b5cf6", // Purple color for primary text
  }

  const mutedTextStyle = {
    color: "#9ca3af", // Lighter gray for muted text
  }

  const goldTextStyle = {
    color: "#fbbf24", // Gold color
  }

  const dropdownToggleStyle = {
    backgroundColor: "#2d3748",
    color: "#e2e8f0",
    border: "none",
  }

  const dropdownMenuStyle = {
    backgroundColor: "#2d3748",
    border: "1px solid #4b5563",
  }

  const dropdownItemStyle = {
    color: "#e2e8f0",
  }

  return (
    <Card className="p-1 d-flex align-items-center shadow-sm rounded-4 mb-2 mt-2" style={cardStyle}>
      <Row className="w-100 align-items-center text-center text-md-start">
        <Col xs={12} md={2} className="d-flex justify-content-center">
          <Image
            src={avatar || "/placeholder.svg"}
            roundedCircle
            width={50}
            height={50}
            alt="avatar"
            className="my-2"
          />
        </Col>

        <Col xs={12} md={2} className="fw-medium my-1">
          Nicholas Patrick
        </Col>

        <Col xs={12} md={2} className="fw-bold my-1" style={primaryTextStyle}>
          $2540.58
        </Col>

        <Col xs={12} md={2} className="my-1" style={mutedTextStyle}>
          150 Products
        </Col>

        <Col xs={12} md={2} className="my-1" style={mutedTextStyle}>
          105 Premium
        </Col>

        <Col xs={12} md={1} className="fw-medium my-1" style={goldTextStyle}>
          +Gold
        </Col>

        <Col xs={12} md={1} className="text-end">
          <Dropdown>
            <Dropdown.Toggle variant="light" size="sm" className="border-0" style={dropdownToggleStyle}>
              ⋮
            </Dropdown.Toggle>
            <Dropdown.Menu style={dropdownMenuStyle}>
              <Dropdown.Item style={dropdownItemStyle}>View</Dropdown.Item>
              <Dropdown.Item style={dropdownItemStyle}>Edit</Dropdown.Item>
              <Dropdown.Item style={dropdownItemStyle}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Card>
  )
}
