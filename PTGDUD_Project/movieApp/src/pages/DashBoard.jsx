import { useState } from "react";

import FilmSummary from "../components/FilmSumary";
import OverviewCard from "../components/OverviewCard";
import CustomChart from "../components/Chart";

function Dashboard() {
  return (
    <div className="containerr px-5">
      {/* <HeaderSection /> */}
      <h2 className="my-3" style={{ color: "white" }}>
        Overview
      </h2>
      <OverviewCard />
      <CustomChart></CustomChart>
    </div>
  );
}

export default Dashboard;
