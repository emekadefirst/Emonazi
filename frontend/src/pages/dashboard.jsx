import React from "react";
import AdminSidebar from "../components/sidebar";
import AdminCard from "../components/landingcard";

const DashBoard = () => {
  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <div className="fixed h-full w-72 bg-base-100 shadow-xl">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-72 p-8">
        <h1 className="text-4xl font-bold text-base-content mb-8">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 ">
          <AdminCard totalUsers={1250} totalBusinesses={87} totalStarted={34} />
          {/* Add more cards here if desired */}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
