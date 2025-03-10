import React, { useState } from "react";

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState({
    users: true,
    subscriptions: true,
    analytics: true,
    settings: true,
  });

  const toggleMenu = (menu) => {
    setExpandedMenus({
      ...expandedMenus,
      [menu]: !expandedMenus[menu],
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
          expanded ? "w-64" : "w-20"
        }`}
      >
        {/* Logo/Brand */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          {expanded ? (
            <h1 className="text-lg font-semibold text-gray-800">
              Admin Portal
            </h1>
          ) : (
            <h1 className="text-lg font-semibold text-gray-800">AP</h1>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {expanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-grow overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-200">
          <ul className="space-y-1 px-3">
            {/* Dashboard */}
            <li>
              <a
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                  activeSection === "dashboard"
                    ? "bg-blue-50 text-purple-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection("dashboard")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    activeSection === "dashboard"
                      ? "text-purple-600"
                      : "text-gray-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                {expanded && <span className="ml-3">Dashboard</span>}
              </a>
            </li>

            {/* User Management */}
            <li className="mt-4">
              <div className="px-3 mb-2">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleMenu("users")}
                >
                  {expanded && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      User Management
                    </span>
                  )}
                  {expanded && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-gray-500 transform transition-transform ${
                        expandedMenus.users ? "rotate-0" : "-rotate-90"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {expandedMenus.users && (
                <ul className="space-y-1">
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "users"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("users")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "users"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {expanded && <span className="ml-3">All Users</span>}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "newUser"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("newUser")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "newUser"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      {expanded && <span className="ml-3">New User</span>}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "userRoles"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("userRoles")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "userRoles"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      {expanded && <span className="ml-3">User Roles</span>}
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Subscription Management */}
            <li className="mt-4">
              <div className="px-3 mb-2">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleMenu("subscriptions")}
                >
                  {expanded && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Subscriptions
                    </span>
                  )}
                  {expanded && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-gray-500 transform transition-transform ${
                        expandedMenus.subscriptions ? "rotate-0" : "-rotate-90"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {expandedMenus.subscriptions && (
                <ul className="space-y-1">
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "plans"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("plans")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "plans"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      {expanded && <span className="ml-3">Plans</span>}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "invoices"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("invoices")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "invoices"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      {expanded && <span className="ml-3">Invoices</span>}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "revenue"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("revenue")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "revenue"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {expanded && <span className="ml-3">Revenue</span>}
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Analytics */}
            <li className="mt-4">
              <div className="px-3 mb-2">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleMenu("analytics")}
                >
                  {expanded && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Analytics
                    </span>
                  )}
                  {expanded && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-gray-500 transform transition-transform ${
                        expandedMenus.analytics ? "rotate-0" : "-rotate-90"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {expandedMenus.analytics && (
                <ul className="space-y-1">
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "analyticsDashboard"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("analyticsDashboard")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "analyticsDashboard"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      {expanded && <span className="ml-3">Overview</span>}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "reports"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("reports")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "reports"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {expanded && <span className="ml-3">Reports</span>}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "userActivity"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("userActivity")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "userActivity"
                            ? "text-purple-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {expanded && <span className="ml-3">User Activity</span>}
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Settings */}
            <li className="mt-4">
              <div className="px-3 mb-2">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleMenu("settings")}
                >
                  {expanded && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Settings
                    </span>
                  )}
                  {expanded && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 text-gray-500 transform transition-transform ${
                        expandedMenus.settings ? "rotate-0" : "-rotate-90"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {expandedMenus.settings && (
                <ul className="space-y-1">
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "general"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("general")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "general"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {expanded && <span className="ml-3">General</span>}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "security"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("security")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "security"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      {expanded && <span className="ml-3">Security</span>}
                    </a>
                  </li>
                  <li>
                    <a
                      className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                        activeSection === "admin"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection("admin")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          activeSection === "admin"
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {expanded && <span className="ml-3">Admin Access</span>}
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <a className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <span className="text-sm font-medium">AJ</span>
            </div>
            {expanded && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
