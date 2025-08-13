import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="nav-root">
      <div className="nav-container">
        <Link to="/" className="nav-brand" aria-label="홈으로">
          <span className="nav-emoji" role="img" aria-label="plane">✈️</span>
        </Link>

        <nav className="nav-links" aria-label="주요 메뉴">
          <NavLink to="/approvals" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>결재</NavLink>
          <NavLink to="/archive"   className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>문서보관</NavLink>
          <NavLink to="/reports"   className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>업무보고</NavLink>
          <NavLink to="/messenger" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>메신저</NavLink>
          <NavLink to="/calendars" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>일정</NavLink>
        </nav>

        <button type="button" className="nav-login">로그인</button>
      </div>
    </header>
  );
}
