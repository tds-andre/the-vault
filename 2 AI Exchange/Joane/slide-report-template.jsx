/**
 * Slide Report Template
 * 
 * A hybrid presentation-report format: dark top (2/3) for presenting,
 * cream bottom (1/3) for notes and evidence.
 * 
 * Usage: Copy this template, customize the pages array and page components.
 * See slide-report-instructions.md for the full specification.
 * 
 * Navigation: Arrow keys, spacebar, click left/right halves, Home/End
 */

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

/* ═══════════════════════════════════════════════════
   COLOR PALETTE — customize per project
   Assign colors to MEANING, not sequence.
   ═══════════════════════════════════════════════════ */

const CORAL  = "#D85A30";  // Primary accent
const BLUE   = "#378ADD";  // Secondary accent
const PURPLE = "#534AB7";  // Combined/synthesis
const TEAL   = "#1D9E75";  // Tertiary / additional
const AMBER  = "#BA7517";  // Warnings, limitations
const GRAY   = "#888780";  // Baselines, neutral
const RED    = "#C03030";  // Critical / standout
const LGRAY  = "#D3D1C7";  // Light gray for chart fills
const DARK   = "#1a1a1f";  // Top section bg
const SURFACE= "#222228";  // Cards in dark section
const MD     = "#9a9a9e";  // Muted text (dark section)
const NOTE_BG= "#f5f4f0";  // Notes section bg
const NM     = "#71706c";  // Notes text color
const NB     = "#d8d6cf";  // Notes border color

const TT = { background: SURFACE, border: `1px solid #333`, borderRadius: 6, fontSize: 11, color: "#fff" };


/* ═══════════════════════════════════════════════════
   PAGE REGISTRY — define your page order here
   ═══════════════════════════════════════════════════ */

const pages = [
  "title",
  "context",
  "data",
  // "definition",      // optional: explain a core concept visually
  "finding-1",
  "finding-2",
  // "finding-3",       // add as many findings as needed
  "takeaways",
  "next-steps",
  // "additional-1",    // optional: supporting analyses
  "end",
];


/* ═══════════════════════════════════════════════════
   PRIMITIVES — reusable components
   ═══════════════════════════════════════════════════ */

const Page = ({ children, notes, num, total }) => (
  <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box", position: "relative" }}>
    <div style={{ flex: "0 0 66%", minHeight: "66vh", background: DARK, padding: "2.5rem 3.5rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {children}
      <div style={{ position: "absolute", top: "calc(66vh - 2rem)", right: "2rem", color: "#777", fontSize: "0.7rem", letterSpacing: "0.1em" }}>{num} / {total}</div>
    </div>
    <div style={{ flex: "0 0 34%", minHeight: "34vh", background: NOTE_BG, padding: "1.25rem 3.5rem 1.5rem", display: "flex", flexDirection: "column" }}>
      <div style={{ color: NM, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.6rem" }}>NOTES</div>
      {notes}
    </div>
  </div>
);

// Section label — small colored tag above title
const Tag = ({ color, children }) => (
  <div style={{ color: color || CORAL, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{children}</div>
);

// Assertion title — the insight IS the headline
const H1 = ({ children, size }) => (
  <h1 style={{ color: "#fff", fontSize: size || "1.7rem", fontWeight: 700, lineHeight: 1.2, margin: "0 0 0.75rem 0", maxWidth: "90%" }}>{children}</h1>
);

// Subtitle — one-line description of what the chart shows
const Sub = ({ children }) => (
  <p style={{ color: MD, fontSize: "0.88rem", lineHeight: 1.5, margin: "0 0 0.75rem 0", maxWidth: "80%" }}>{children}</p>
);

// Large headline metric
const Big = ({ value, label, color }) => (
  <div style={{ textAlign: "center", padding: "0.5rem 1rem" }}>
    <div style={{ color: color || CORAL, fontSize: "2.2rem", fontWeight: 800, lineHeight: 1 }}>{value}</div>
    <div style={{ color: MD, fontSize: "0.65rem", marginTop: "0.3rem" }}>{label}</div>
  </div>
);

// Small headline metric
const Sm = ({ value, label, color }) => (
  <div style={{ textAlign: "center", padding: "0.3rem 0.5rem" }}>
    <div style={{ color: color || CORAL, fontSize: "1.5rem", fontWeight: 800, lineHeight: 1 }}>{value}</div>
    <div style={{ color: MD, fontSize: "0.6rem", marginTop: "0.2rem" }}>{label}</div>
  </div>
);

// Colored pill tag
const Pill = ({ children, color }) => (
  <span style={{ display: "inline-block", padding: "0.15rem 0.55rem", borderRadius: "999px", fontSize: "0.6rem", fontWeight: 600, background: `${color || CORAL}22`, color: color || CORAL, marginRight: "0.35rem" }}>{children}</span>
);

// Bullet with colored dot (for presentation area)
const Dot = ({ children, color }) => (
  <div style={{ display: "flex", gap: "0.55rem", marginBottom: "0.4rem", alignItems: "flex-start" }}>
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: color || CORAL, marginTop: "0.42rem", flexShrink: 0 }} />
    <div style={{ color: "#ccc", fontSize: "0.82rem", lineHeight: 1.45 }}>{children}</div>
  </div>
);

// Notes paragraph
const NP = ({ children }) => (
  <p style={{ color: NM, fontSize: "0.73rem", lineHeight: 1.5, margin: "0 0 0.45rem 0" }}>{children}</p>
);

// Notes table (with optional row highlight)
const NT = ({ headers, rows, highlight }) => (
  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.66rem", marginTop: "0.25rem" }}>
    <thead>
      <tr>{headers.map((h, i) => <th key={i} style={{ color: NM, fontWeight: 600, padding: "0.22rem 0.45rem", borderBottom: `1px solid ${NB}`, textAlign: i === 0 ? "left" : "right", fontSize: "0.62rem" }}>{h}</th>)}</tr>
    </thead>
    <tbody>
      {rows.map((row, ri) => (
        <tr key={ri} style={highlight === ri ? { background: "#ece9e0" } : {}}>{row.map((cell, ci) => <td key={ci} style={{ color: highlight === ri ? "#333" : NM, fontWeight: highlight === ri ? 600 : 400, padding: "0.2rem 0.45rem", borderBottom: `1px solid #e8e6e0`, textAlign: ci === 0 ? "left" : "right", fontVariantNumeric: "tabular-nums" }}>{cell}</td>)}</tr>
      ))}
    </tbody>
  </table>
);


/* ═══════════════════════════════════════════════════
   PAGES — customize these for your analysis
   ═══════════════════════════════════════════════════ */

// --- TITLE PAGE ---
const PageTitle = (p) => (
  <Page num={p.num} total={p.total} notes={
    <>
      <NP>Brief description of the data source, time range, and any key preprocessing steps.</NP>
      <NP>Key limitations or caveats that frame the entire analysis.</NP>
    </>
  }>
    <Tag color={CORAL}>Team or Domain</Tag>
    <h1 style={{ color: "#fff", fontSize: "2.8rem", fontWeight: 800, lineHeight: 1.1, margin: "0 0 0.75rem 0" }}>Analysis Title</h1>
    <p style={{ color: MD, fontSize: "1rem", margin: "0 0 2rem 0" }}>Client or Subject — Date</p>
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Pill color={CORAL}>Type</Pill>
      <Pill color={BLUE}>Scope</Pill>
      <Pill color={AMBER}>Timeframe</Pill>
    </div>
  </Page>
);

// --- CONTEXT / MOTIVATION ---
const PageContext = (p) => (
  <Page num={p.num} total={p.total} notes={
    <>
      <NP><strong>Key term:</strong> Definition of the central concept being analyzed.</NP>
      <NP><strong>Metric definition:</strong> How the core metric is computed, with a plain-language example.</NP>
      <NP><strong>Baselines:</strong> What comparisons are used and why.</NP>
    </>
  }>
    <Tag>Motivation</Tag>
    <H1 size="2.1rem">The core question driving this analysis, phrased as a question?</H1>
    <Sub>Why this matters — one sentence on the practical implication.</Sub>
    <div style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
      <div>
        <Tag color={CORAL}>Key questions</Tag>
        <Dot color={CORAL}><strong style={{ color: "#fff" }}>Q1:</strong> First sub-question</Dot>
        <Dot color={BLUE}><strong style={{ color: "#fff" }}>Q2:</strong> Second sub-question</Dot>
      </div>
      <div>
        <Tag color={AMBER}>Limitations</Tag>
        <Dot color={AMBER}>Limitation one</Dot>
        <Dot color={AMBER}>Limitation two</Dot>
      </div>
    </div>
  </Page>
);

// --- DATA OVERVIEW ---
// Pattern: horizontal bar funnel + metric grid
const PageData = (p) => {
  const data = [
    { label: "Total records", value: 100000 },
    { label: "After filtering", value: 85000 },
    { label: "Target segment", value: 42000 },
  ];
  const colors = [LGRAY, GRAY, CORAL];
  return (
    <Page num={p.num} total={p.total} notes={
      <>
        <NP><strong>Filter applied:</strong> Description of what was removed and why. Cost: X records (Y%).</NP>
        <NP><strong>Data quality:</strong> Any columns excluded or known issues.</NP>
      </>
    }>
      <Tag>The data</Tag>
      <H1>Headline summary of the dataset</H1>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center", marginTop: "0.5rem" }}>
        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data} layout="vertical" margin={{ left: 5, right: 50 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="label" tick={{ fill: MD, fontSize: 11 }} width={120} axisLine={false} tickLine={false} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={22}>
                {data.map((_, i) => <Cell key={i} fill={colors[i]} opacity={0.85} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          <Sm value="85K" label="after filter" color={GRAY} />
          <Sm value="42K" label="target segment" color={CORAL} />
          <Sm value="3yr" label="time range" color={BLUE} />
          <Sm value="99%" label="coverage" color={TEAL} />
        </div>
      </div>
    </Page>
  );
};

// --- FINDING PAGE (chart + metrics pattern) ---
// Most common layout: chart on left, headline metrics on right
const PageFinding1 = (p) => {
  const data = [
    { group: "Treatment", value: 45.2 },
    { group: "Control A", value: 12.8 },
    { group: "Control B", value: 8.3 },
  ];
  const colors = [CORAL, GRAY, AMBER];
  return (
    <Page num={p.num} total={p.total} notes={
      <>
        <NP><strong>Methodology:</strong> How this metric was computed. What population, what window, what counts.</NP>
        <NT headers={["Parameter", "Treatment", "Control A", "Control B", "Lift"]}
          rows={[
            ["Setting 1", "45.2%", "12.8%", "8.3%", "3.5x"],
            ["Setting 2", "52.1%", "15.3%", "10.1%", "3.4x"],
            ["Setting 3", "58.7%", "18.2%", "12.4%", "3.2x"],
          ]} />
      </>
    }>
      <Tag color={CORAL}>Q1 — Question thread</Tag>
      <H1>The assertion: what you found, stated as a fact</H1>
      <Sub>One-line definition of the metric being shown</Sub>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div style={{ flex: 1.3 }}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ left: 0, right: 10, top: 15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="group" tick={{ fill: MD, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: MD, fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={TT} />
              <Bar dataKey="value" radius={[3, 3, 0, 0]} barSize={40}>
                {data.map((_, i) => <Cell key={i} fill={colors[i]} opacity={0.85} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.5rem" }}>
          <Big value="3.5x" label="lift vs control A" color={CORAL} />
          <Big value="5.4x" label="lift vs control B" color={AMBER} />
        </div>
      </div>
    </Page>
  );
};

// --- FINDING PAGE (comparison pattern) ---
// Side-by-side big numbers with "vs" between them
const PageFinding2 = (p) => (
  <Page num={p.num} total={p.total} notes={
    <>
      <NP>Explanation of how these numbers were derived and what they mean in context.</NP>
      <NT headers={["Window", "Treatment", "Control", "Lift"]}
        rows={[
          ["30d", "68.6%", "12.7%", "5.4x"],
          ["60d", "77.5%", "17.6%", "4.4x"],
          ["90d", "82.0%", "21.1%", "3.9x"],
        ]}
        highlight={0} />
    </>
  }>
    <Tag color={RED}>Standout finding</Tag>
    <H1 size="1.9rem">The most impactful number, stated as a headline</H1>
    <Sub>One-line interpretation of what this means practically.</Sub>
    <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ color: AMBER, fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "0.5rem" }}>HIGHLIGHT LABEL</div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ background: `${CORAL}22`, border: `2px solid ${CORAL}`, borderRadius: 14, padding: "1.2rem 2rem", marginBottom: "0.4rem" }}>
              <div style={{ color: CORAL, fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>69%</div>
            </div>
            <div style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>Treatment group</div>
          </div>
          <div style={{ color: MD, fontSize: "1.3rem" }}>vs</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ background: `${GRAY}22`, border: `2px solid ${GRAY}`, borderRadius: 14, padding: "1.2rem 2rem", marginBottom: "0.4rem" }}>
              <div style={{ color: GRAY, fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>13%</div>
            </div>
            <div style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>Control group</div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "1.5rem" }}>
        <Big value="5.4x" label="lift" color={CORAL} />
      </div>
    </div>
  </Page>
);

// --- TAKEAWAYS ---
// Pattern: 2x2 grid of numbered insight cards
const PageTakeaways = (p) => (
  <Page num={p.num} total={p.total} notes={
    <>
      <NP><strong>Challenged premise:</strong> "Initial assumption" turned out to be wrong because X. This reframed the analysis.</NP>
      <NP><strong>Caveat:</strong> Finding N has limited sample size (X cases). Directionally strong but needs validation.</NP>
    </>
  }>
    <Tag color={TEAL}>Takeaways</Tag>
    <H1 size="1.6rem">Key findings</H1>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem 2rem", marginTop: "0.75rem" }}>
      {[
        { n: "01", title: "First finding", body: "Brief supporting evidence with a key number.", color: CORAL },
        { n: "02", title: "Second finding", body: "Brief supporting evidence with a key number.", color: BLUE },
        { n: "03", title: "Third finding", body: "Brief supporting evidence with a key number.", color: RED },
        { n: "04", title: "Fourth finding", body: "Brief supporting evidence with a key number.", color: PURPLE },
      ].map(({ n, title, body, color }) => (
        <div key={n} style={{ background: SURFACE, borderRadius: 8, padding: "1rem 1.25rem", borderLeft: `3px solid ${color}` }}>
          <div style={{ color, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "0.3rem" }}>{n}</div>
          <div style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.3rem", lineHeight: 1.25 }}>{title}</div>
          <div style={{ color: MD, fontSize: "0.85rem", lineHeight: 1.45 }}>{body}</div>
        </div>
      ))}
    </div>
  </Page>
);

// --- NEXT STEPS ---
// Pattern: vertical stack with label tags
const PageNextSteps = (p) => (
  <Page num={p.num} total={p.total} notes={
    <>
      <NP>Additional context on each proposed next step: what it requires, expected timeline, dependencies.</NP>
    </>
  }>
    <Tag color={AMBER}>Next steps</Tag>
    <H1 size="1.6rem">Open questions and next moves</H1>
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
      {[
        { label: "Validate", text: "Description of the first next step as a full sentence.", color: CORAL },
        { label: "Specify", text: "Description of the second next step as a full sentence.", color: BLUE },
        { label: "Enrich", text: "Description of the third next step as a full sentence.", color: TEAL },
        { label: "Model", text: "Description of the fourth next step as a full sentence.", color: PURPLE },
      ].map(({ label, text, color }) => (
        <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          <div style={{ color, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", minWidth: "4.5rem", paddingTop: "0.1rem" }}>{label}</div>
          <div style={{ color: "#ccc", fontSize: "0.92rem", lineHeight: 1.45 }}>{text}</div>
        </div>
      ))}
    </div>
  </Page>
);

// --- CLOSING SLIDE ---
const PageEnd = (p) => (
  <Page num={p.num} total={p.total} notes={
    <>
      <NP>Source data reference. Links to detailed reports. Analysis credits.</NP>
    </>
  }>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Tag color={CORAL}>Team or Domain</Tag>
      <h1 style={{ color: "#fff", fontSize: "2.2rem", fontWeight: 800, margin: "0 0 1rem 0", textAlign: "center" }}>Analysis Title</h1>
      <div style={{ color: MD, fontSize: "1rem", textAlign: "center" }}>Client — Date</div>
      <div style={{ marginTop: "2rem", display: "flex", gap: "2.5rem" }}>
        <Sm value="Metric 1" label="description" color={CORAL} />
        <Sm value="Metric 2" label="description" color={BLUE} />
        <Sm value="Metric 3" label="description" color={RED} />
      </div>
      <div style={{ color: MD, fontSize: "0.8rem", marginTop: "2.5rem" }}>Thank you</div>
    </div>
  </Page>
);


/* ═══════════════════════════════════════════════════
   PAGE MAP — connect page IDs to components
   ═══════════════════════════════════════════════════ */

const PAGE_MAP = {
  "title": PageTitle,
  "context": PageContext,
  "data": PageData,
  "finding-1": PageFinding1,
  "finding-2": PageFinding2,
  "takeaways": PageTakeaways,
  "next-steps": PageNextSteps,
  "end": PageEnd,
};


/* ═══════════════════════════════════════════════════
   APP SHELL — navigation and rendering
   (usually no changes needed here)
   ═══════════════════════════════════════════════════ */

export default function SlideReport() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); setCurrent(c => Math.min(c + 1, pages.length - 1)); }
      if (e.key === "ArrowLeft") { e.preventDefault(); setCurrent(c => Math.max(c - 1, 0)); }
      if (e.key === "Home") { e.preventDefault(); setCurrent(0); }
      if (e.key === "End") { e.preventDefault(); setCurrent(pages.length - 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const PC = PAGE_MAP[pages[current]];
  return (
    <div style={{ width: "100%", minHeight: "100vh", cursor: "default", userSelect: "none" }} onClick={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (e.clientX - rect.left > rect.width * 0.5) setCurrent(c => Math.min(c + 1, pages.length - 1));
      else setCurrent(c => Math.max(c - 1, 0));
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <PC num={current + 1} total={pages.length} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 2, background: NB }}>
        <div style={{ height: "100%", background: CORAL, width: `${((current + 1) / pages.length) * 100}%`, transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}
