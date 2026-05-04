#!/usr/bin/env python3
"""
Scan OFP threads → threads.json snapshot for cockpit.jsx.

Reads `1 OFP/Threads/{prioritized,active,captured,postponed,closed}/*.md`,
parses filename + YAML frontmatter + body, emits JSON next to this script.

Run:    python scan.py
Output: threads.json (same dir)
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

# ---- Paths ----
SCRIPT_DIR = Path(__file__).resolve().parent
# scan.py lives at <vault>/2 Agents/Gaia/apps/cockpit/scan.py
VAULT_ROOT = SCRIPT_DIR.parent.parent.parent.parent
THREADS_DIR = VAULT_ROOT / "1 OFP" / "Threads"
OUTPUT_PATH = SCRIPT_DIR / "threads.json"

STATUS_DIRS = ["prioritized", "active", "captured", "postponed", "closed"]

# ---- Regex ----
FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)
FIELD_RE = re.compile(r"^([\w_-]+):[ \t]*(.*)$", re.MULTILINE)
NEXT_RE = re.compile(r"^next:[ \t]*(.+?)$", re.MULTILINE)
ITEMS_SECTION_RE = re.compile(
    r"^##\s+Items\s*\n(.*?)(?=\n##\s+|\Z)",
    re.MULTILINE | re.DOTALL,
)


def parse_filename(name: str) -> dict | None:
    base = name[:-3] if name.endswith(".md") else name
    parts = base.split("-")
    # New schema: YYMMDD-domain-subdomain-type-subject(...)
    if len(parts) >= 5 and len(parts[0]) == 6 and parts[0].isdigit():
        yymmdd = parts[0]
        return {
            "schema": "v3",
            "filename_date": f"20{yymmdd[:2]}-{yymmdd[2:4]}-{yymmdd[4:6]}",
            "domain": parts[1],
            "subdomain": parts[2] if parts[2] != parts[1] else "",
            "type": parts[3],
            "subject": "-".join(parts[4:]),
        }
    # Legacy: e.g. building-andre-cursos
    if len(parts) >= 2:
        return {
            "schema": "legacy",
            "filename_date": None,
            "domain": parts[0],
            "subdomain": "",
            "type": None,
            "subject": "-".join(parts[1:]),
        }
    return None


def parse_frontmatter(content: str) -> tuple[dict, str]:
    m = FRONTMATTER_RE.match(content)
    if not m:
        return {}, content
    fields: dict = {}
    for fm in FIELD_RE.finditer(m.group(1)):
        k, v = fm.group(1), fm.group(2).strip()
        if v.startswith("'") and v.endswith("'"):
            v = v[1:-1]
        elif v.startswith('"') and v.endswith('"'):
            v = v[1:-1]
        if v in ("", "null", "None"):
            v = None
        fields[k] = v
    return fields, content[m.end():]


def parse_next(body: str) -> str | None:
    m = NEXT_RE.search(body)
    if not m:
        return None
    val = m.group(1).strip()
    return val if val and val != "—" else None


def parse_capture_inbox_item(line: str) -> dict:
    # "- [ ] text *→ ? context*"
    m = re.match(
        r"-\s*(?:\[[^\]]*\]\s*)?(.+?)(?:\s+\*(?:→\s*\?\s*)?(.+?)\*)?$",
        line,
    )
    if m:
        return {"text": m.group(1).strip(), "context": (m.group(2) or "").strip()}
    return {"text": line.lstrip("- ").strip(), "context": ""}


def parse_revisit_item(line: str) -> dict:
    # "- URL *(added DATE, context)*"
    m = re.match(
        r"-\s*(\S+?)(?:\s+\*\(added\s+([^,]+?)(?:,\s*(.*?))?\)\*)?$",
        line,
    )
    if m:
        return {
            "url": m.group(1).strip(),
            "added": (m.group(2) or "").strip(),
            "context": (m.group(3) or "").strip(),
        }
    return {"url": line.lstrip("- ").strip(), "added": "", "context": ""}


def parse_items_section(body: str, subject: str) -> list:
    m = ITEMS_SECTION_RE.search(body)
    if not m:
        return []
    out = []
    for line in m.group(1).splitlines():
        line = line.strip()
        if not line.startswith("- "):
            continue
        if subject == "capture-inbox":
            out.append(parse_capture_inbox_item(line))
        elif subject == "revisit-inbox":
            out.append(parse_revisit_item(line))
        else:
            out.append({"text": line[2:].strip()})
    return out


def scan() -> dict:
    out = {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "vault_path": str(VAULT_ROOT),
        "threads": {s: [] for s in STATUS_DIRS},
        "special": {},
    }
    for status in STATUS_DIRS:
        dir_path = THREADS_DIR / status
        if not dir_path.exists():
            continue
        for fp in sorted(dir_path.glob("*.md")):
            content = fp.read_text(encoding="utf-8")
            fm, body = parse_frontmatter(content)
            fn = parse_filename(fp.name) or {}

            thread = {
                "file": fp.stem,
                "status_dir": status,
                "schema": fn.get("schema", "unknown"),
                "domain": fm.get("domain") or fn.get("domain"),
                "subdomain": fm.get("subdomain") or fn.get("subdomain", ""),
                "type": fm.get("type") or fn.get("type"),
                "subject": fn.get("subject") or fp.stem,
                "created_on": fm.get("created_on") or fm.get("created") or fn.get("filename_date"),
                "updated_on": fm.get("updated_on") or fm.get("updated"),
                "status": fm.get("status") or status,
                "due": fm.get("due"),
                "next": parse_next(body),
            }
            out["threads"][status].append(thread)

            if thread["type"] == "special":
                items = parse_items_section(body, thread["subject"])
                key = thread["subject"].replace("-", "_")
                out["special"][key] = items

    return out


if __name__ == "__main__":
    data = scan()
    OUTPUT_PATH.write_text(
        json.dumps(data, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    total = sum(len(v) for v in data["threads"].values())
    print(f"OK  {total} threads -> {OUTPUT_PATH.relative_to(VAULT_ROOT)}")
    for s in STATUS_DIRS:
        print(f"    {s:12} {len(data['threads'][s]):3}")
    print(f"    special      {len(data['special'])} ({', '.join(data['special'].keys()) or '-'})")
