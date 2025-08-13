// src/components/pages/HomePage.jsx
import React, { useMemo } from 'react';
import { PlaneTakeoff, Clock, MapPin } from 'lucide-react';
import './home.css';

export default function HomePage({ imageUrl, weather, scheduleItems = [] }) {
  const todayStr = useMemo(
    () =>
      new Intl.DateTimeFormat('ko', {
        dateStyle: 'full',
        timeZone: 'Asia/Seoul',
      }).format(new Date()),
    []
  );

  return (
    <div className="ap-root">
      {/* MAIN ONLY (Navbar는 App.jsx에서 렌더) */}
      <main className="ap-container ap-main">
        <div className="ap-grid">
          {/* 히어로 섹션 */}
          <section className="ap-hero">
            {imageUrl ? (
              <div
                className="ap-hero-bg"
                style={{ backgroundImage: `url('${imageUrl}')` }}
                aria-label="비행기 이미지"
              />
            ) : (
              <div className="ap-hero-empty">
                <PlaneTakeoff size={56} />
              </div>
            )}
          </section>

          {/* 오른쪽: 위젯 스택 */}
          <aside className="ap-sidebar">
            {/* 운항정보 위젯 */}
            <div className="ap-card">
              <div className="ap-card-title">
                <Clock size={16} /> 운항정보
              </div>

              {scheduleItems.length ? (
                <ul className="ap-list">
                  {scheduleItems.map((it, i) => (
                    <li key={i}>
                      <div className="ap-list-main">
                        <div className="ap-list-title">{it.title}</div>
                        <div className="ap-list-sub">{it.location || ''}</div>
                      </div>
                      <div className="ap-list-time">{it.time || ''}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="ap-skeleton">
                  <div />
                  <div />
                  <div />
                </div>
              )}
            </div>

            {/* 날씨 위젯 */}
            <div className="ap-card">
              <div className="ap-card-title">
                <MapPin size={16} /> {weather?.city || '도시 미지정'}
              </div>

              {weather ? (
                <div className="ap-weather">
                  <div className="ap-weather-temp">
                    {typeof weather.temp === 'number' ? `${weather.temp}°` : '—'}
                  </div>
                  <div className="ap-weather-meta">
                    <div>{weather.condition}</div>
                    <div>
                      최고 {weather.high}° · 최저 {weather.low}°
                    </div>
                  </div>
                  <div className="ap-weather-date">{todayStr}</div>
                </div>
              ) : (
                <div className="ap-skeleton">
                  <div />
                  <div />
                  <div />
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER (원하면 이 부분도 Layout으로 분리 가능) */}
      <footer className="ap-footer">
        <div className="ap-container ap-footer-inner">
          <span className="ap-footer-left">
            <PlaneTakeoff size={14} /> © {new Date().getFullYear()} AirOps
          </span>
        </div>
      </footer>
    </div>
  );
}
