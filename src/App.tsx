import type { CSSProperties } from 'react'
import photo from './assets/photo.jpg'
import {
  profile,
  jobs,
  edu,
  campus,
  stickers,
  tools,
  stats,
  about,
} from './data/resume'
import './App.css'

// ---- 关键词荧光笔高亮 ----
const HL_YELLOW = ['从0到1', '百城百站', '三层治理', '四表协同', '猜你想问']
const HL_GREEN = [
  '18站',
  '14站',
  '125站',
  '102站',
  '数百条QA',
  '2586人',
  '2300人',
  '79.7%',
  '1-2小时',
  '155篇',
  '100w+',
  '2W+',
  '75篇',
  '60%',
  '1700+',
  '10w+',
  '5000+',
  'CET-6',
  '普通话二甲',
]

function hl(text: string) {
  const terms = [
    ...HL_YELLOW.map((t) => ({ t, c: 'hl-y' })),
    ...HL_GREEN.map((t) => ({ t, c: 'hl-g' })),
  ].sort((a, b) => b.t.length - a.t.length)
  const re = new RegExp(
    `(${terms.map((x) => x.t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'g',
  )
  return text.split(re).map((part, i) => {
    const hit = terms.find((x) => x.t === part)
    return hit ? (
      <mark key={i} className={hit.c}>
        {part}
      </mark>
    ) : (
      part
    )
  })
}

const CIRCLED = ['①', '②', '③', '④', '⑤']

function SecTitle({ zh, en }: { zh: string; en: string }) {
  return (
    <h2 className="sec">
      <em>{zh}</em>
      <small>{en}</small>
    </h2>
  )
}

function PaperClip() {
  return (
    <svg className="clip" viewBox="0 0 30 64" aria-hidden="true">
      <path
        d="M10 10 V46 A6 6 0 0 0 22 46 V14 A3.5 3.5 0 0 1 29 14 V42"
        fill="none"
        stroke="#9aa0a6"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function App() {
  return (
    <div className="board">
      <main className="sheet">
        {/* ===== 顶部：证件卡 + 手写便签 ===== */}
        <header className="header">
          <div className="idcard">
            <PaperClip />
            <div className="photozone">
              <span className="yblock" />
              <img className="photo" src={photo} alt={`${profile.name} 照片`} />
            </div>
            <div className="idtext">
              <h1>{profile.name}</h1>
              <p className="title">{profile.title}</p>
              <p className="tag">{profile.tagline}</p>
              <div className="infogrid">
                <p className="row">
                  <span className="ico">☎</span>
                  <span className="v">{profile.phone}</span>
                </p>
                <p className="row">
                  <span className="ico">✉</span>
                  <span className="v">{profile.email}</span>
                </p>
                <p className="row">
                  <span className="ico">微</span>
                  <span className="v">微信 {profile.wechat}</span>
                </p>
                <p className="row">
                  <span className="ico">语</span>
                  <span className="v">{profile.langs}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="handnote">
            <p className="note">
              如果这份简历没能<span className="circle-word">讲清楚我</span>
              ，<br />
              欢迎随时找我要补充～
            </p>
            <p className="num">
              <span className="hico red">☎</span> {profile.phone}
            </p>
            <p className="num">
              <span className="bbox">微</span> 微信同号 · 期待聊聊 AI 与增长
            </p>
          </div>
        </header>

        <div className="columns">
          {/* ===== 左列：经历 ===== */}
          <section className="col-l">
            <SecTitle zh="工作经历" en="Experience" />
            <div className="timeline">
              {jobs.map((j) => (
                <article className="tl-item" key={j.company}>
                  <p className="period">
                    <b>{j.period}</b>
                    {j.tag && <span className="hl-g jtag">{j.tag}</span>}
                  </p>
                  <h3 className="role">{j.role}</h3>
                  <p className="org">
                    {j.company}
                    {j.dept && <span className="dept"> ｜ {j.dept}</span>}
                  </p>
                  {j.summary && <p className="jsummary">{hl(j.summary)}</p>}
                  {j.groups?.map((g, gi) => (
                    <div className="grp" key={g.title}>
                      <h4>
                        {CIRCLED[gi]} {g.title}
                      </h4>
                      {g.points.map((p, pi) => (
                        <p className="pt" key={pi}>
                          {hl(p)}
                        </p>
                      ))}
                    </div>
                  ))}
                  {j.bullets?.map((b) => (
                    <p className="pt" key={b.t}>
                      <b>{b.t}：</b>
                      {hl(b.text)}
                    </p>
                  ))}
                </article>
              ))}
            </div>

            <SecTitle zh="教育背景" en="Education" />
            <div className="timeline">
              <article className="tl-item">
                <p className="period">
                  <b>{edu.period}</b>
                </p>
                <h3 className="role">
                  {edu.school} <span className="major">{edu.major}</span>
                </h3>
                <p className="pt">{edu.courses}</p>
              </article>
            </div>

            <SecTitle zh="校园经历" en="Campus" />
            <div className="timeline">
              <article className="tl-item">
                <p className="period">
                  <b>{campus.period}</b>
                </p>
                <h3 className="role">{campus.org}</h3>
                <p className="org">{campus.role}</p>
                {campus.bullets.map((b) => (
                  <p className="pt" key={b.t}>
                    <b>{b.t}：</b>
                    {b.text}
                  </p>
                ))}
              </article>
            </div>
          </section>

          {/* ===== 右列：拼贴 / 技能 / 便签 / 关于 ===== */}
          <aside className="col-r">
            <SecTitle zh="能力拼贴" en="Area of Expertise" />
            <div className="stickerboard">
              <span className="board-caption">主打能力就是这几个 ↓</span>
              <span className="board-phrase phrase-1">会写 Prompt 的运营～</span>
              <span className="board-phrase phrase-2">从 0 到 1 上瘾者</span>
              {stickers.map((s, i) => (
                <span
                  key={s.label}
                  className={`sticker s-${s.shape} pos-${i + 1}`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {s.label}
                </span>
              ))}
              <svg className="doodle d-arrow" viewBox="0 0 90 60" aria-hidden="true">
                <path d="M6 8 C 30 12, 58 26, 74 46" />
                <path d="M60 42 L76 48 L72 32" />
              </svg>
              <svg className="doodle d-star" viewBox="0 0 44 44" aria-hidden="true">
                <path d="M22 6 V 38 M6 22 H 38" />
                <path d="M12 12 L 32 32 M32 12 L 12 32" opacity="0.45" />
              </svg>
              <svg className="doodle d-star2" viewBox="0 0 44 44" aria-hidden="true">
                <path d="M22 8 V 36 M8 22 H 36" />
              </svg>
              <svg className="doodle d-wave" viewBox="0 0 100 20" aria-hidden="true">
                <path d="M4 12 q 11 -12 22 0 t 22 0 t 22 0" />
              </svg>
            </div>

            <SecTitle zh="工具技能" en="Software Skills" />
            <div className="tools">
              {tools.map((t) => (
                <div
                  className="tool"
                  key={t.name}
                  style={
                    { '--c': t.color, '--v': `${t.level}%` } as CSSProperties
                  }
                >
                  <span className="ticon">{t.abbr}</span>
                  <span className="tname">{t.name}</span>
                  <span className="slider">
                    <i />
                  </span>
                </div>
              ))}
            </div>

            <div className="sticky">
              <h3>✦ 数据亮点 Numbers</h3>
              <div className="statlist">
                {stats.map((s) => (
                  <p className="stat" key={s.desc}>
                    <b>{s.num}</b>
                    <span>{s.desc}</span>
                  </p>
                ))}
              </div>
            </div>

            <SecTitle zh="关于我" en="About" />
            <div className="about">
              <p>{hl(about.text)}</p>
              <p className="chips">
                {about.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </p>
            </div>
          </aside>
        </div>

        <footer className="footer">
          <p className="sig">{profile.name} · 2026.11</p>
          <p className="madeby">本页由 React + Vite 手工搭建 ✦ 浏览器打印可导出同款 PDF</p>
        </footer>
      </main>
    </div>
  )
}

export default App
