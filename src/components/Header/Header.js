import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ onPage }) {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="logo">QEstate</div>

      {onPage === "home" ? (
        <div className="nav-link" onClick={() => navigate("/listings")}>
          <span>Explore</span>
        </div>
      ) : (
        <div className="nav-link" onClick={() => navigate("/")}>
          <span>Featured Listings</span>
        </div>
      )}
    </div>
  );
}
