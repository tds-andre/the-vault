(async () => {
  const WORKSPACE_ID = "23657b30-4554-4a00-a211-87b3fa5e4593";
  const URL = `https://www.ruddr.io/api/www/workspaces/${WORKSPACE_ID}/time-entries`;

  // === EDIT THESE ===
  const START_DATE = "2026-04-02";   // inclusive (YYYY-MM-DD)
  const END_DATE   = "2026-04-30";   // inclusive (YYYY-MM-DD)
  const SKIP_WEEKENDS = true;
  const DRY_RUN = false;             // set true to preview without POSTing
  // ==================

  const PAYLOAD_BASE = {
    endTime: null,
    startTime: null,
    notes: null,
    projectTaskId: "0fac8262-4b2e-4bf5-b088-b115a9b0adce", // New Scores & Attributes Development
    projectRoleId: "43dafaf5-8e94-4817-8ef6-c0fec7791e6c", // Software Engineer
    projectId:     "d27fc347-fc85-4011-a5c1-4767ac347500", // Surge Projects - Phase 3 (AKUVO)
    typeId: "project_time",
    minutes: 480, // 8h
    timeOffTypeId: null,
  };

  const fmt = d => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const start = new Date(`${START_DATE}T00:00:00`);
  const end   = new Date(`${END_DATE}T00:00:00`);
  if (isNaN(start) || isNaN(end) || start > end) {
    throw new Error("Invalid date range");
  }

  // Build list of dates first so we can preview
  const dates = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dow = d.getDay(); // 0=Sun, 6=Sat
    if (SKIP_WEEKENDS && (dow === 0 || dow === 6)) continue;
    dates.push(fmt(d));
  }
  console.log(`Will post ${dates.length} entries (${dates[0]} → ${dates.at(-1)})${DRY_RUN ? " [DRY RUN]" : ""}`);

  const results = [];
  for (const date of dates) {
    const body = JSON.stringify({ ...PAYLOAD_BASE, date });

    if (DRY_RUN) {
      console.log("DRY", date, body);
      results.push({ date, status: "dry-run" });
      continue;
    }

    try {
      const res = await fetch(URL, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body,
      });
      const text = await res.text();
      let data; try { data = JSON.parse(text); } catch { data = text; }

      if (res.ok) {
        console.log(`✓ ${date}  id=${data?.id}`);
        results.push({ date, status: res.status, id: data?.id });
      } else {
        console.error(`✗ ${date}  ${res.status}`, data);
        results.push({ date, status: res.status, error: data });
      }
    } catch (err) {
      console.error(`✗ ${date}  network`, err);
      results.push({ date, status: "network-error", error: String(err) });
    }

    await new Promise(r => setTimeout(r, 200)); // be polite to Ruddr
  }

  console.table(results);
  window.__ruddrResults = results;
  return results;
})();