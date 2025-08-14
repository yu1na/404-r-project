import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const USE_API = import.meta.env.VITE_USE_API === "true";

function SubmitReport() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const styles = {
    hero: {
      height: 300,
      backgroundImage: "url(/images/Generated.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    heroMask: {
      background: "linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.35))",
    },
  };

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const fd = new FormData(e.currentTarget);
      if (!String(fd.get("title") || "").trim()) throw new Error("제목을 입력하세요.");
      if (!String(fd.get("type") || "").trim()) throw new Error("보고 유형을 선택하세요.");
      if (!String(fd.get("content") || "").trim()) throw new Error("내용을 입력하세요.");

      if (USE_API) {
        const res = await fetch("/api/reports", {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`제출 실패 (HTTP ${res.status})${msg ? " - " + msg : ""}`);
        }
      } else {
        await new Promise((r) => setTimeout(r, 500));
      }

      navigate("/reports", { replace: true });
    } catch (err) {
      setError(err.message || "제출 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
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
              <h1 className="display-5 fw-bold text-white mb-0">업무 보고 작성</h1>
            </div>
          </div>
        </section>
      </header>

      <main className="container-xxl py-4 flex-grow-1">
        <div className="card shadow-sm">
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-bold">제목</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="제목을 입력하세요" />
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label fw-bold">보고 유형</label>
                <select id="type" name="type" className="form-select">
                  <option value="">선택하세요</option>
                  <option value="daily">일일 안전 리포트</option>
                  <option value="incident">항공기 이상 보고서</option>
                  <option value="operation">운항 상황 보고</option>
                  <option value="ground">지상 상황 보고</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="content" className="form-label fw-bold">내용</label>
                <textarea id="content" name="content" className="form-control" rows="8" placeholder="보고서 내용을 작성하세요"></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="file" className="form-label fw-bold">첨부 파일</label>
                <input type="file" className="form-control" id="file" name="file" />
              </div>

              <div className="d-flex justify-content-between">
                <Link to="/" className="btn btn-outline-secondary">
                  <i className="bi bi-arrow-left"></i> 목록
                </Link>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  <i className="bi bi-check-lg"></i> {submitting ? "제출 중..." : "제출"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <div className="position-fixed bottom-0 end-0 p-3 d-flex flex-column gap-2">
        <Link to="/" className="btn btn-light shadow-sm border">
          <i className="bi bi-house" aria-hidden="true"></i> 홈으로
        </Link>
      </div>
    </div>
  );
}

export default SubmitReport;
