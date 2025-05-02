import { useState } from 'react';

import FilmSummary from '../components/FilmSumary';
import OverviewCard from '../components/OverviewCard';
import CustomChart from '../components/Chart';


function Dashboard() {



    return (
        <div className='containerr px-5'>

            {/* <HeaderSection /> */}
            <h1 className='my-3' style={{ color: "white" }}>Overview</h1>
            <OverviewCard />
            <CustomChart ></CustomChart>
            <h2 style={{ color: "whitesmoke" }}>Top film</h2>
            <div className="list-top d-flex flex-column align-items-center">

                <FilmSummary></FilmSummary>
                <FilmSummary></FilmSummary>
                <FilmSummary></FilmSummary>
                <FilmSummary></FilmSummary>
                <FilmSummary></FilmSummary>
            </div>

        </div>
    );
}

export default Dashboard;