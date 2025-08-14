import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ApprovalReport() {
  const [rows, setRows] = useState([
    { no: 1, title: "항공기 이상 보고서", author: "user1", date: "2025-07-20", status: "PENDING" },
    { no: 2, title: "운항 상황 보고", author: "user2", date: "2025-07-21", status: "PENDING" },
  ]);

  const statusInfo = (s) => {
    switch(s){
      case "APPROVED": return { label:"승인", cls:"bg-success" };
      case "REJECTED": return { label:"반려", cls:"bg-danger" };
      case "PENDING": return { label:"대기", cls:"bg-warning text-dark" };
      default: return { label: s, cls:"bg-secondary" };
    }
  };

  const handleApprove = (no) => setRows(rows.map(r => r.no === no ? {...r, status: "APPROVED"} : r));
  const handleReject  = (no) => setRows(rows.map(r => r.no === no ? {...r, status: "REJECTED"} : r));

  const styles = {
    hero: {
      height: 300,
      backgroundImage: "url(/images/Generated.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    heroMask: {
      background: "linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.35))",
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">

      {/* 상단 네비 + 배너 */}
      <header>
        <nav className="navbar bg-white border-bottom">
          <div className="container-xxl">
            <Link className="navbar-brand fw-bold" to="/">✈ 그룹웨어</Link>
            <ul className="navbar-nav flex-row gap-3">
              <li className="nav-item"><span className="nav-link">전자결재시스템</span></li>
              <li className="nav-item"><span className="nav-link">문서보관소</span></li>
              <li className="nav-item"><span className="nav-link">업무보고시스템</span></li>
              <li className="nav-item"><span className="nav-link">커뮤니케이션기능</span></li>
              <li className="nav-item"><span className="nav-link">일정관리</span></li>
            </ul>
            <div className="ms-auto">
              <Link to="/login" className="btn btn-outline-secondary btn-sm">로그인</Link>
            </div>
          </div>
        </nav>

        <section className="position-relative" style={styles.hero}>
          <div className="position-absolute top-0 start-0 w-100 h-100" style={styles.heroMask} />
          <div className="container-xxl position-relative" style={{ zIndex: 1 }}>
            <div className="py-5">
              <h1 className="display-5 fw-bold text-white mb-0">업무 보고 결재</h1>
            </div>
          </div>
        </section>
      </header>

      {/* 본문 */}
      <main className="container-xxl py-4 flex-grow-1">

        {/* 검색 + 결재/글쓰기 버튼 */}
        <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
          <select defaultValue="" className="form-select w-auto">
            <option value="">번호</option>
            <option value="">제목</option>
            <option value="">작성자</option>
            <option value="">작성일</option>
          </select>

          <div className="input-group" style={{ maxWidth: 420 }}>
            <input type="text" className="form-control" placeholder="검색어를 입력하세요" />
            <button type="button" className="btn btn-outline-secondary">
              <i className="bi bi-search"></i>
              <span className="visually-hidden">검색</span>
            </button>
          </div>
        </div>

        {/* 결재 테이블 */}
        <div className="table-responsive shadow-sm rounded-3">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="text-center" style={{width:90}}>번호</th>
                <th>제목</th>
                <th className="text-center" style={{width:140}}>작성자</th>
                <th className="text-center" style={{width:140}}>작성일</th>
                <th className="text-center" style={{width:120}}>상태</th>
                <th className="text-center" style={{width:180}}>결재</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => {
                const info = statusInfo(r.status);
                return (
                  <tr key={r.no}>
                    <td className="text-center">{r.no}</td>
                    <td>{r.title}</td>
                    <td className="text-center">{r.author}</td>
                    <td className="text-center">{r.date}</td>
                    <td className="text-center">
                      <span className={`badge rounded-pill ${info.cls}`}>{info.label}</span>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-success me-1" disabled={r.status!=="PENDING"} onClick={()=>handleApprove(r.no)}>승인</button>
                      <button className="btn btn-sm btn-danger" disabled={r.status!=="PENDING"} onClick={()=>handleReject(r.no)}>반려</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </main>

      {/* 우측 하단 홈 버튼 */}
      <div className="position-fixed bottom-0 end-0 p-3 d-flex flex-column gap-2">
        <Link to="/" className="btn btn-light shadow-sm border">
          <i className="bi bi-house"></i> 홈으로
        </Link>
      </div>

    </div>
  );
}

export default ApprovalReport;