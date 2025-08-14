import React from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';          
import 'bootstrap-icons/font/bootstrap-icons.css';            

const USE_API = import.meta.env.VITE_USE_API === "true";

function Login() {
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
      const formData = new FormData(e.currentTarget);
      const username = String(formData.get("username") || "").trim();
      const password = String(formData.get("password") || "").trim();

      if (!username || !password) {
        throw new Error("아이디와 비밀번호를 모두 입력하세요.");
      }

      if (USE_API) {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
          const msg = await safeText(res);
          throw new Error(`로그인 실패 (HTTP ${res.status})${msg ? " - " + msg : ""}`);
        }

      } else {
        await new Promise((r) => setTimeout(r, 400));
        console.debug("[DEV] 로그인 시뮬레이션:", { username, password });
      }

      navigate("/", { replace: true });

    } catch (err) {
      console.error(err);
      setError(err.message || "로그인 처리 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <main className="container-xxl py-4 flex-grow-1 d-flex justify-content-center align-items-start">
        <div className="card p-4 shadow-sm mt-4" style={{ width: 400 }}>
          <h3 className="mb-4 text-center">로그인</h3>

          {!USE_API && (
            <div className="alert alert-warning py-2" role="alert">
              현재 <code>VITE_USE_API=false</code> 이므로 더미 로그인으로 동작합니다.
            </div>
          )}
          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">아이디</label>
              <input name="username" type="text" className="form-control" id="username" placeholder="아이디 입력" disabled={submitting} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">비밀번호</label>
              <input name="password" type="password" className="form-control" id="password" placeholder="비밀번호 입력" disabled={submitting} />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
              {submitting ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;

async function safeText(res) {
  try { return await res.text(); } catch { return ""; }
}
