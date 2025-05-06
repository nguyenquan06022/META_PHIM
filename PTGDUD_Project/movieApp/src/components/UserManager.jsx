"use client"

import { useEffect, useState } from "react"
import { Container, Table, Button, Form, Pagination, OverlayTrigger, Tooltip } from "react-bootstrap"
import { FaPlus, FaCog, FaInfoCircle } from "react-icons/fa"
import User from "./User"
import instanceAPI from "../global/axiosInstance"

const UserManagement = () => {
    // Dữ liệu người dùng mẫu
    const [users, setUsers] = useState([])

    useEffect(() => {

        instanceAPI.get("/getDsUser").then((response) => {
            setUsers(response.data)
        })
            .catch((error) => {
                console.error("Error fetching user data:", error)
            })

    }, [])



    const handleDeleteUser = (userId) => {
        instanceAPI.delete(`/xoaUser/${userId}`)
            .then(() => {
                setUsers(prev => prev.filter(u => u._id !== userId));
                Swal.fire("Đã xóa!", "Người dùng đã được xóa.", "success");
            })
            .catch(err => console.error("Lỗi khi xóa:", err));
    };


    const handleUpdate = (userId) => {
        instanceAPI.put(`/capnhatuser/${userId}`)
            .then((res) => {
                const updatedUser = res.data;
                console.log("Cập nhật thành công:", updatedUser);
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user._id === userId ? updatedUser : user
                    )
                );
                Swal.fire("Cấp quyền thành công!", "Người dùng đã được cấp quyền.", "success");
            })
            .catch(err => console.error("Lỗi khi phân quyền:", err));
    };




    // State cho pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const totalUsers = 1356546
    const totalProjects = 884
    const totalPages = 100

    // Hàm xử lý chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    return (
        <Container fluid className=" rounded shadow-sm" style={{ backgroundColor: "rgb(20, 24, 27)", padding: "0px" }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <h6 className="mb-0 me-2 text-white">
                        All Users: <span className="fw-bold">{totalUsers.toLocaleString()}</span>
                    </h6>

                    <OverlayTrigger placement="top" overlay={<Tooltip>Information about users and projects</Tooltip>}>
                        <span className="ms-2 text-muted">
                            <FaInfoCircle />
                        </span>
                    </OverlayTrigger>
                </div>

            </div>

            
            <div className="table-responsive">
                <Table hover className="align-middle" style={{ borderCollapse: "separate", borderSpacing: "0px" }}>
                    <thead className="">
                        <tr style={{ backgroundColor: "rgb(30, 35, 48)" }}>
                           
                            <th>Tên tài khoản</th>
                            <th>Vai trò</th>
                            <th>Mạng xã hội</th>
                            <th>Ngày tạo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {users.map((user) => (
                            <User key={user.id} user={user} onDelete={handleDeleteUser} onUpdate={handleUpdate} />
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex align-items-center">

                </div>

                <Pagination className="mb-0">
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
                    <Pagination.Item active={currentPage === 1} onClick={() => handlePageChange(1)}>
                        1
                    </Pagination.Item>
                    <Pagination.Item active={currentPage === 2} onClick={() => handlePageChange(2)}>
                        2
                    </Pagination.Item>
                    <Pagination.Item active={currentPage === 3} onClick={() => handlePageChange(3)}>
                        3
                    </Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item active={currentPage === 100} onClick={() => handlePageChange(100)}>
                        100
                    </Pagination.Item>
                    <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
                </Pagination>
            </div>
        </Container>
    )
}

export default UserManagement
