import React from "react";

const AdminCard = ({ totalUsers, totalBusinesses, totalStarted }) => {
  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <div className="card-body p-6">
        <h2 className="card-title text-base-content text-2xl font-bold mb-4">
          Dashboard Stats
        </h2>
        <div className="stats shadow w-full bg-base-100 grid grid-cols-3 gap-4">
          {/* Total Users */}
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-base-content">Total Users</div>
            <div className="stat-value text-primary">
              {totalUsers.toLocaleString()}
            </div>
          </div>

          {/* Total Businesses */}
          <div className="stat">
            <div className="stat-figure text-success">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4-11V3"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-base-content">Total Businesses</div>
            <div className="stat-value text-success">{totalBusinesses}</div>
          </div>

          {/* Total Started */}
          <div className="stat">
            <div className="stat-figure text-warning">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-base-content">Total Started</div>
            <div className="stat-value text-warning">{totalStarted}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
