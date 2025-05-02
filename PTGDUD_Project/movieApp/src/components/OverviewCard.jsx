import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMedium, FaUser } from 'react-icons/fa6'
import { BiCategory } from 'react-icons/bi'

function OverviewCard() {
    const [overview, setOverview] = useState(null);


    return (
        <div className="container-fluid px-0">
            <div className="row">
                <div className="col-md-3 mb-3" >
                    <div className="card shadow-sm">

                        <div className="card-body position-relative" style={{ backgroundColor: '#fff0f5', borderRadius: '10px' }}>

                            {/* Icon ở góc trên bên phải */}
                            <div
                                className="position-absolute top-0 end-0 m-3 text-primary"
                                style={{ fontSize: "24px" }}
                            >
                                <FaUser style={{ color: "black" }} />
                            </div>

                            <h5 className="card-title text-muted">Thời gian xem trung bình</h5>

                            <p className="card-text fs-3 fw-bold">${overview?.turnover.toLocaleString() || ""}</p>
                            <p className="text-success small">+ {overview?.turnoverChange || ""}% period change</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm">


                        <div
                            className="card-body position-relative"
                            style={{ backgroundColor: "#eff6ff", borderRadius: "10px" }}
                        >
                            {/* Icon ở góc trên bên phải */}
                            <div
                                className="position-absolute top-0 end-0 m-3 text-primary"
                                style={{ fontSize: "24px" }}
                            >
                                <FaMedium style={{ color: "black" }} />
                            </div>

                            <h5 className="card-title text-muted">Số lượt xem phim</h5>
                            <p className="card-text fs-3 fw-bold">
                                ${overview?.profit.toLocaleString() || ""}
                            </p>
                            <p className="text-success small">
                                + {overview?.profitChange || ""}% period change
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body position-relative" style={{ backgroundColor: '#eff6ff', borderRadius: '10px' }}>
                            <div
                                className="position-absolute top-0 end-0 m-3 text-primary"
                                style={{ fontSize: "24px" }}
                            >
                                <BiCategory style={{ color: "black" }} />
                            </div>
                            <h5 className="card-title text-muted">Người dùng mới</h5>
                            <p className="card-text fs-3 fw-bold">{overview?.newCustomer || "0"}</p>
                            <p className="text-success small">+ {overview?.newCustomerChange || ""}% period change</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body position-relative" style={{ backgroundColor: '#eff6ff', borderRadius: '10px' }}>
                            <div
                                className="position-absolute top-0 end-0 m-3 text-primary"
                                style={{ fontSize: "24px" }}
                            >
                                <BiCategory style={{ color: "black" }} />
                            </div>
                            <h5 className="card-title text-muted">Thể loại yếu thích</h5>
                            <p className="card-text fs-3 fw-bold">{overview?.newCustomer || "0"}</p>
                            <p className="text-success small">+ {overview?.newCustomerChange || ""}% period change</p>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    );
}

export default OverviewCard;