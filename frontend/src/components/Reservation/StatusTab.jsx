import React from "react";

export const StatusTab = ({ setActiveTab, activeTab }) => {
  return (
    <div className="sm:w-4/6 w-full flex justify-end items-end">
      <div
        role="tablist"
        className="tabs tabs-xs tabs-box w-auto flex justify-center items-center border border-base-content/10"
      >
        <a
          role="tab"
          className={`tab  text-xs ${
            activeTab === "comfirmed" && "tab-active"
          }`}
          onClick={() => setActiveTab("comfirmed")}
        >
          Confirmed
        </a>
        <a
          role="tab"
          className={`tab ${
            activeTab === "cancelled" && "tab-active"
          } text-xs `}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </a>
      </div>
    </div>
  );
};
