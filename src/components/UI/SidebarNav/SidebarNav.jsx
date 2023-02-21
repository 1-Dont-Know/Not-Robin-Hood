import React from "react";

const SidebarNav = () => {
  return (
    <nav>
      <ul>
        <h2 style={{ display: "flex", alignItems: "center" }}>
          General
          <span>
            <hr
              style={{
                width: "200px",
                height: "1px",
                backgroundColor: "black",
              }}
            />
          </span>
        </h2>
        <li>Overview</li>
        <li>Markets</li>
        <li>Stock Transaction</li>
      </ul>
      <ul>
        <h2>Support</h2>
        <li>Settings</li>
        <li>Log out</li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
