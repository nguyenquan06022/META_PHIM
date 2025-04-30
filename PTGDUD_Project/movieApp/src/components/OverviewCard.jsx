import { useState, useEffect } from 'react';
import axios from 'axios';
import a from '../assets/Lab_05/Button 1509.png';
import b from '../assets/Lab_05/Button 1529.png';
import c from '../assets/Lab_05/Button 1530.png';

function OverviewCard() {
    const [overview, setOverview] = useState(null);

    useEffect(() => {
        async function fetchOverviewData() {
            try {
                const response = await axios.get('http://localhost:3001/overview');
                setOverview(response.data);
            } catch (error) {
                alert("Chạy Json server:   npx json-server --watch public/db.json --port 3001")
                console.error('Error fetching overview data:', error);
            }
        }
        fetchOverviewData();
    }, []);

    if (!overview) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body position-relative" style={{ backgroundColor: '#fff0f5' }}>
                            <img className=" position-absolute top-0 end-0 m-3 text-primary"
                                src={a}
                                style={{ width: "32px", height: '32px' }}
                            ></img>
                            <h5 className="card-title text-muted">Turnover</h5>
                            <p className="card-text fs-3 fw-bold">${overview?.turnover.toLocaleString() || ""}</p>
                            <p className="text-success small">+ {overview?.turnoverChange || ""}% period change</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body position-relative" style={{ backgroundColor: '#eff6ff' }}>

                            <img className=" position-absolute top-0 end-0 m-3 text-primary"
                                src={b}
                                style={{ width: "32px", height: '32px' }}
                            ></img>

                            <h5 className="card-title text-muted">Profit</h5>
                            <p className="card-text fs-3 fw-bold"> ${overview?.profit.toLocaleString() || ""}</p>
                            <p className="text-success small"> + {overview?.profitChange || ""}% period change</p>
                        </div>

                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body position-relative" style={{ backgroundColor: '#eff6ff' }}>
                            <img className=" position-absolute top-0 end-0 m-3 text-primary"
                                src={c}
                                style={{ width: "32px", height: '32px' }}
                            ></img>
                            <h5 className="card-title text-muted">New customer</h5>
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