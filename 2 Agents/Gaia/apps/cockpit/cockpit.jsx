import React, { useState, useEffect, useMemo } from 'react';
import {
  Compass, ListTodo, RotateCcw, Calendar,
  Inbox, Bookmark, Archive, FileText,
  Clock, ExternalLink, ChevronRight, Tag,
  Database, Upload, RefreshCw, AlertCircle
} from 'lucide-react';

// ============================================================
// DATA LOADING
// ============================================================

const FETCH_PATH = './threads.json';

function useThreadsData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [source, setSource] = useState(null); // 'fetch' | 'file'
  const [loading, setLoading] = useState(true);

  const tryFetch = () => {
    setLoading(true);
    setError(null);
    fetch(FETCH_PATH)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        setData(d);
        setSource('fetch');
        setLoading(false);
      })
      .catch((e) => {
        setError(`Fetch falhou: ${e.message}`);
        setLoading(false);
      });
  };

  useEffect(() => { tryFetch(); }, []);

  const loadFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const d = JSON.parse(ev.target.result);
        setData(d);
        setSource('file');
        setError(null);
      } catch (err) {
        setError(`JSON inválido: ${err.message}`);
      }
    };
    reader.onerror = () => setError('Erro ao ler arquivo');
    reader.readAsText(file);
  };

  return { data, error, source, loading, tryFetch, loadFromFile };
}

// ============================================================
// HELPERS
// ============================================================

function daysSince(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  const now = new Date();
  return Math.floor((now - d) / (1000 * 60 * 60 * 24));
}

function StalenessBadge({ days }) {
  if (days === null || days === undefined) {
    return <span className="text-[10px] text-stone-300">—</span>;
  }
  let cls = 'text-stone-400';
  let suffix = '';
  if (days >= 30) { cls = 'text-amber-700'; suffix = ' ⚠'; }
  if (days >= 60) { cls = 'text-red-700'; suffix = ' ⚠⚠'; }
  return <span className={`tabular-nums text-xs ${cls}`}>{days}d{suffix}</span>;
}

function DomainTag({ domain, subdomain }) {
  const colors = {
    personal: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    professional: 'bg-blue-50 text-blue-800 border-blue-200',
    family: 'bg-rose-50 text-rose-800 border-rose-200',
    ventures: 'bg-violet-50 text-violet-800 border-violet-200',
    meta: 'bg-stone-100 text-stone-700 border-stone-300',
  };
  const cls = colors[domain] || 'bg-stone-100 text-stone-600 border-stone-300';
  const label = subdomain && subdomain !== domain && subdomain !== ''
    ? `${domain}/${subdomain}` : domain;
  return (
    <span className={`text-[10px] px-2 py-0.5 border ${cls}`}>{label || '—'}</span>
  );
}

// Pretty subject from filename (strip the YYMMDD-domain-subdomain-type prefix)
function prettyTitle(thread) {
  if (thread.subject) return thread.subject.replace(/-/g, ' ');
  return thread.file;
}

// ============================================================
// CARDS
// ============================================================

function ThreadCard({ thread }) {
  const days = daysSince(thread.created_on);
  return (
    <div className="border-b border-stone-200 px-5 py-3 hover:bg-stone-50 transition">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <div className="text-[13px] font-medium text-stone-900 truncate" title={thread.file}>
          {prettyTitle(thread)}
        </div>
        <StalenessBadge days={days} />
      </div>
      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
        <DomainTag domain={thread.domain} subdomain={thread.subdomain} />
        <span className="text-[10px] text-stone-500 uppercase tracking-wide">{thread.type || '—'}</span>
        {thread.due && <span className="text-[10px] text-amber-700">due {thread.due}</span>}
        {thread.schema === 'legacy' && (
          <span className="text-[9px] text-orange-600 uppercase">legacy schema</span>
        )}
      </div>
      {thread.next && (
        <div className="text-xs text-stone-600 mt-1 leading-snug">
          <span className="text-stone-400">→ </span>{thread.next}
        </div>
      )}
    </div>
  );
}

function CaptureInboxCard({ item }) {
  return (
    <div className="border-b border-stone-200 px-5 py-3 hover:bg-stone-50 transition">
      <div className="text-[13px] text-stone-900 leading-snug mb-1">{item.text}</div>
      {item.context && (
        <div className="text-[11px] text-stone-500 italic">{item.context}</div>
      )}
    </div>
  );
}

function RevisitCard({ item }) {
  const days = daysSince(item.added);
  return (
    <div className="border-b border-stone-200 px-5 py-3 hover:bg-stone-50 transition">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-stone-900 hover:text-blue-700 truncate flex items-center gap-1.5 min-w-0"
        >
          <ExternalLink size={12} className="text-stone-400 flex-shrink-0" />
          <span className="truncate">{item.url}</span>
        </a>
        <StalenessBadge days={days} />
      </div>
      {item.context && (
        <div className="text-[11px] text-stone-500 italic ml-5">{item.context}</div>
      )}
    </div>
  );
}

// ============================================================
// RESURFACE
// ============================================================

function ResurfaceView({ data }) {
  const [tab, setTab] = useState('captured');
  const [sortMode, setSortMode] = useState('oldest');
  const [domainFilter, setDomainFilter] = useState('all');

  const captured = data?.threads?.captured || [];
  const postponed = data?.threads?.postponed || [];
  const captureInbox = data?.special?.capture_inbox || [];
  const revisit = data?.special?.revisit_inbox || [];

  const tabs = [
    { id: 'captured', label: 'Captured', icon: Inbox, count: captured.length, hint: 'needs qualification' },
    { id: 'capture-inbox', label: 'Capture Inbox', icon: FileText, count: captureInbox.length, hint: 'uncertain items' },
    { id: 'revisit', label: 'Revisit', icon: Bookmark, count: revisit.length, hint: 'links / resources' },
    { id: 'postponed', label: 'Postponed', icon: Archive, count: postponed.length, hint: 'dormant — review periodically' },
  ];

  const sortedThreads = useMemo(() => {
    let list = tab === 'postponed' ? postponed : tab === 'captured' ? captured : [];
    if (domainFilter !== 'all') list = list.filter((t) => t.domain === domainFilter);
    return [...list].sort((a, b) => {
      if (sortMode === 'oldest') return (a.created_on || '').localeCompare(b.created_on || '');
      if (sortMode === 'newest') return (b.created_on || '').localeCompare(a.created_on || '');
      if (sortMode === 'domain') return (a.domain || '').localeCompare(b.domain || '');
      return 0;
    });
  }, [tab, sortMode, domainFilter, captured, postponed]);

  const domains = ['all', 'personal', 'professional', 'family', 'ventures', 'meta'];

  return (
    <div className="flex flex-col h-full">
      <header className="px-6 pt-5 pb-3 border-b border-stone-300 bg-white">
        <div className="flex items-baseline gap-3 mb-1">
          <RotateCcw size={18} className="text-stone-700" />
          <h1 className="text-lg font-semibold text-stone-900">Resurface</h1>
          <span className="text-xs text-stone-500">— pull what's been quiet back into view</span>
        </div>
      </header>

      <div className="flex border-b border-stone-300 bg-white px-6">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-xs flex items-center gap-2 border-b-2 transition ${
                isActive
                  ? 'border-stone-900 text-stone-900 font-medium'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Icon size={13} />
              {t.label}
              <span className="text-stone-400 tabular-nums">({t.count})</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 px-6 py-2.5 bg-stone-50 border-b border-stone-200 text-xs">
        <span className="text-stone-500">{tabs.find((t) => t.id === tab)?.hint}</span>
        <div className="flex-1" />
        {(tab === 'captured' || tab === 'postponed') && (
          <>
            <div className="flex items-center gap-1.5">
              <Tag size={11} className="text-stone-400" />
              <select
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="bg-white border border-stone-300 px-2 py-1 text-stone-700 focus:outline-none focus:border-stone-700"
              >
                {domains.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} className="text-stone-400" />
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
                className="bg-white border border-stone-300 px-2 py-1 text-stone-700 focus:outline-none focus:border-stone-700"
              >
                <option value="oldest">oldest first</option>
                <option value="newest">newest first</option>
                <option value="domain">by domain</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-auto bg-white">
        {tab === 'captured' && (
          <>
            {sortedThreads.map((t) => <ThreadCard key={t.file} thread={t} />)}
            {sortedThreads.length === 0 && (
              <div className="p-8 text-center text-sm text-stone-500">No captured threads match filter.</div>
            )}
          </>
        )}
        {tab === 'capture-inbox' && (
          <>
            {captureInbox.map((item, i) => <CaptureInboxCard key={i} item={item} />)}
            {captureInbox.length === 0 && (
              <div className="p-8 text-center text-sm text-stone-500">Capture inbox empty.</div>
            )}
          </>
        )}
        {tab === 'revisit' && (
          <>
            {revisit.map((item, i) => <RevisitCard key={i} item={item} />)}
            {revisit.length === 0 && (
              <div className="p-8 text-center text-sm text-stone-500">Revisit list empty.</div>
            )}
          </>
        )}
        {tab === 'postponed' && (
          <>
            {sortedThreads.map((t) => <ThreadCard key={t.file} thread={t} />)}
            {sortedThreads.length === 0 && (
              <div className="p-8 text-center text-sm text-stone-500">Postponed empty for this filter.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SHELL & STATES
// ============================================================

function Sidebar({ activeView, setActiveView, source, generated, onReload }) {
  const items = [
    { id: 'eagles', icon: Compass, label: 'Eagles View', stub: true },
    { id: 'operational', icon: ListTodo, label: 'Operational', stub: true },
    { id: 'resurface', icon: RotateCcw, label: 'Resurface', stub: false },
    { id: 'weekly', icon: Calendar, label: 'Weekly Review', stub: true },
  ];
  const sourceLabel = source === 'fetch'
    ? 'auto-fetched threads.json'
    : source === 'file'
    ? 'loaded from file'
    : 'no data';
  return (
    <aside className="w-56 bg-stone-100 border-r border-stone-300 flex flex-col">
      <div className="px-4 py-5 border-b border-stone-300">
        <div className="text-[10px] uppercase tracking-widest text-stone-500">Gaia</div>
        <div className="text-base font-semibold text-stone-900 mt-0.5">Cockpit</div>
        <div className="text-[10px] text-stone-500 mt-1 tabular-nums">v0.1</div>
      </div>
      <nav className="flex-1 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                isActive ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Icon size={15} className={isActive ? '' : 'text-stone-500'} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.stub && <span className="text-[9px] text-stone-400 uppercase">stub</span>}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-stone-300 text-[10px] text-stone-500 leading-relaxed">
        <div className="flex items-center gap-1.5 mb-1">
          <Database size={10} />
          <span>{sourceLabel}</span>
        </div>
        {generated && (
          <div className="tabular-nums mb-2">{generated.replace('T', ' ').slice(0, 16)} UTC</div>
        )}
        <button
          onClick={onReload}
          className="flex items-center gap-1 text-stone-600 hover:text-stone-900 transition"
        >
          <RefreshCw size={10} />
          reload fetch
        </button>
      </div>
    </aside>
  );
}

function StubView({ id }) {
  const labels = { eagles: 'Eagles View', operational: 'Operational', weekly: 'Weekly Review' };
  return (
    <div className="flex items-center justify-center h-full bg-stone-50">
      <div className="text-center">
        <ChevronRight size={32} className="text-stone-300 mx-auto mb-3" />
        <div className="text-stone-600 text-sm">{labels[id]} — coming next</div>
      </div>
    </div>
  );
}

function NoDataScreen({ error, onFilePick }) {
  return (
    <div className="flex items-center justify-center h-screen bg-stone-50 p-8">
      <div className="max-w-md w-full bg-white border border-stone-300 p-8">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={18} className="text-amber-600" />
          <h2 className="text-base font-semibold text-stone-900">Sem dados</h2>
        </div>
        <p className="text-sm text-stone-600 mb-4 leading-relaxed">
          Não consegui carregar <code className="bg-stone-100 px-1">threads.json</code> via fetch.
          Roda <code className="bg-stone-100 px-1">python scan.py</code> e carrega o arquivo manualmente abaixo.
        </p>
        {error && (
          <div className="text-[11px] text-stone-500 mb-4 font-mono bg-stone-50 border border-stone-200 p-2">
            {error}
          </div>
        )}
        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-stone-900 hover:bg-stone-800 text-white text-sm cursor-pointer transition">
          <Upload size={14} />
          <span>Carregar threads.json</span>
          <input
            type="file"
            accept=".json,application/json"
            onChange={(e) => e.target.files[0] && onFilePick(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-stone-50">
      <div className="text-stone-500 text-sm">Carregando threads…</div>
    </div>
  );
}

// ============================================================
// APP
// ============================================================

export default function Cockpit() {
  const [view, setView] = useState('resurface');
  const { data, error, source, loading, tryFetch, loadFromFile } = useThreadsData();

  if (loading) return <LoadingScreen />;
  if (!data) return <NoDataScreen error={error} onFilePick={loadFromFile} />;

  return (
    <div className="flex h-screen bg-stone-50 font-sans antialiased text-stone-900">
      <Sidebar
        activeView={view}
        setActiveView={setView}
        source={source}
        generated={data.generated_at}
        onReload={tryFetch}
      />
      <main className="flex-1 overflow-hidden">
        {view === 'resurface' ? <ResurfaceView data={data} /> : <StubView id={view} />}
      </main>
    </div>
  );
}
