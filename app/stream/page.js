"use client";

import React, { useState } from "react";
import './stream.css';
const StreamPage = () => {
  const [showMainDropdown, setShowMainDropdown] = useState(false);
  const [showNestedDropdown, setShowNestedDropdown] = useState(false);

  const toggleMainDropdown = () => setShowMainDropdown((prev) => !prev);
  const toggleNestedDropdown = () => setShowNestedDropdown((prev) => !prev);

  return (
    <div className="dropdown-container">
    
      <button
        onClick={toggleMainDropdown}
        className="dropdown-btn"
      >
        Select Stream
      </button>

      {/* Main Dropdown Menu */}
      {showMainDropdown && (
        <div className="dropdown-menu">
          <ul>
            <li
              className="dropdown-item"
              onClick={toggleNestedDropdown}
            >
              B.Tech
            </li>
            <li className="dropdown-item">Business</li>
            <li className="dropdown-item">Entrepreneurship</li>
          </ul>

          {/* Nested Dropdown Menu */}
          {showNestedDropdown && (
            <div className="nested-dropdown">
              <ul>
                <li className="dropdown-item">Sub-Option 1</li>
                <li className="dropdown-item">Sub-Option 2</li>
                <li className="dropdown-item">Sub-Option 3</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StreamPage;
