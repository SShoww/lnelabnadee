import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ExternalLink, RefreshCw, AlertCircle, ShieldAlert, Folder, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'
import config from '../config/config.json'

// ponytail: merge all embed maps; pageIds are unique across sections
const allEmbeds = {
  ...config.crawledEmbeds,
  ...config.qualityWorkEmbeds,
  ...config.eqaEmbeds,
  ...config.iqcEmbeds,
  ...config.rluEmbeds,
  "work-instruction": config.workInstruction,
}

// ──────────────────────────────────────────────
// AppsScriptPanel — renders the warning alert,
// copy-pasteable doGet fix code, deployment steps,
// and the live iframe underneath (Double-Experience Layout)
// ──────────────────────────────────────────────
function AppsScriptPanel({ url, title }) {
  const [copied, setCopied] = useState(false)
  const [openAdmin, setOpenAdmin] = useState(false)

  const codeSnippet = `function doGet(e) {
  // Create your HTML output from a file or string
  var output = HtmlService.createTemplateFromFile("Index"); // or whatever file name is used

  // CRITICAL: Disable X-Frame-Options constraints to allow iframing
  output.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  return output.evaluate();
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Alert Card & Banner */}
      <div className="
        w-full rounded-2xl p-5 border
        dark:bg-[#0c1220]/60 light:bg-slate-50/80
        dark:border-teal-500/20 light:border-teal-400/30
        backdrop-blur-sm shadow-md
      ">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mt-0.5 shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold dark:text-white light:text-slate-800">
                ระบบบันทึกข้อมูลและตรวจสอบการบำรุงรักษาเครื่องมือ ({title})
              </h4>
              <p className="text-xs dark:text-slate-400 light:text-slate-600 mt-1.5 leading-relaxed">
                <span className="font-semibold text-teal-400">หมายเหตุ:</span> หากระบบแจ้งข้อความ <strong>'Refused to connect'</strong> หรือไม่สามารถโหลดหน้าต่างบันทึกข้อมูลด้านล่างได้ มีสาเหตุมาจากระบบความปลอดภัยของเบราว์เซอร์ หรือระบบตรวจพบบัญชี Google ลงทะเบียนซ้ำซ้อน
              </p>
              <p className="text-[11px] dark:text-slate-500 light:text-slate-500 mt-1 italic">
                แนะแนวทาง: หากกดปุ่มแล้วหน้าต่างใหม่ยังแจ้งปัญหา ให้ลองเปิดผ่าน "หน้าต่างไม่ระบุตัวตน (Incognito Window)"
              </p>
            </div>
          </div>
          
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold
              bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-400 text-white shrink-0
              shadow-[0_0_15px_rgba(20,184,166,0.3)]
              hover:shadow-[0_0_25px_rgba(20,184,166,0.5)]
              transition-all duration-300
            "
          >
            <ExternalLink size={13} />
            เปิดระบบบันทึกข้อมูลในหน้าต่างใหม่ (คลิกที่นี่)
          </a>
        </div>

        {/* Collapsible Admin Guide */}
        <div className="mt-4 border-t dark:border-slate-800/60 light:border-slate-200 pt-3">
          <button
            onClick={() => setOpenAdmin(!openAdmin)}
            className="flex items-center gap-1.5 text-xs font-medium dark:text-teal-400/90 light:text-teal-600 hover:underline"
          >
            {openAdmin ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            สำหรับผู้ดูแลระบบ: วิธีแก้ไขข้อผิดพลาด Refused to connect (X-Frame-Options)
          </button>
          
          {openAdmin && (
            <div className="mt-3 text-xs dark:text-slate-300 light:text-slate-700 bg-slate-950/40 dark:bg-slate-900/60 rounded-xl p-4 border dark:border-slate-800 light:border-slate-200">
              <p className="font-semibold mb-2 text-teal-400">ขั้นตอนที่ 1: แก้ไข Code entry function (doGet) ใน Google Apps Script</p>
              <div className="relative mb-4">
                <pre className="p-3 rounded-lg bg-slate-950 text-emerald-400 overflow-x-auto font-mono text-[11px] max-h-60">
                  {codeSnippet}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/80 transition-all"
                  title="คัดลอกโค้ด"
                >
                  {copied ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}
                </button>
              </div>

              <p className="font-semibold mb-1 text-teal-400">ขั้นตอนที่ 2: ทำการ Deploy เวอร์ชันใหม่ (Redeployment)</p>
              <ol className="list-decimal pl-5 space-y-1 dark:text-slate-400 light:text-slate-600">
                <li>เปิดไปที่หน้าแก้ไขโครงการ Google Apps Script</li>
                <li>คลิกปุ่ม <strong>"Deploy"</strong> (การทำให้ใช้งานได้) -&gt; เลือก <strong>"Manage Deployments"</strong> (จัดการการทำให้ใช้งานได้)</li>
                <li>คลิกไอคอนรูปดินสอ <strong>"Edit"</strong> (แก้ไข) ที่รายการ Deployment ที่ต้องการนำเสนอข้อมูล</li>
                <li>ภายใต้หัวข้อ <strong>"Version"</strong> (เวอร์ชัน) ให้เลือกเป็น <strong>"New Version"</strong> (เวอร์ชันใหม่)</li>
                <li>คลิกปุ่ม <strong>"Deploy"</strong> (ทำให้ใช้งานได้) แล้วคัดลอก URL ใหม่ที่ได้เพื่อมาบันทึกอัปเดตในระบบ</li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Embedded frame underneath */}
      <div className="relative rounded-xl overflow-hidden border dark:border-slate-700/50 light:border-slate-200 bg-white h-[600px] shadow-md">
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-0"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// DriveFolderGrid — renders Drive folder links as a stylized card grid
// ──────────────────────────────────────────────
function DriveFolderGrid({ links }) {
  if (!links || links.length === 0) return null
  return (
    <div className="rounded-xl border dark:border-slate-700/50 light:border-slate-200
      dark:bg-white/[0.03] light:bg-slate-50 p-4 flex flex-col gap-3">
      <p className="text-[10px] uppercase tracking-widest dark:text-slate-500 light:text-slate-400 font-semibold">
        📁 โฟลเดอร์รายงาน EQA — Google Drive
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium
              border transition-all duration-200
              dark:bg-teal-500/10 dark:border-teal-500/25 dark:text-teal-300
              dark:hover:bg-teal-500/20 dark:hover:border-teal-500/50 dark:hover:text-teal-200
              light:bg-teal-50 light:border-teal-400/30 light:text-teal-700
              light:hover:bg-teal-100 light:hover:border-teal-400/60
              hover:scale-[1.02] active:scale-100 shadow-sm"
          >
            <Folder size={14} className="shrink-0 opacity-75 group-hover:opacity-100 transition-opacity" />
            <span className="leading-tight">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// EmbedSlot — renders single URL as iframe or AppsScript double experience panel
// ──────────────────────────────────────────────
function EmbedSlot({ url, title }) {
  const isAppsScript = url.includes('script.google.com')

  if (isAppsScript) {
    return <AppsScriptPanel url={url} title={title} />
  }

  return (
    <div className="relative rounded-xl overflow-hidden border dark:border-slate-700/50 light:border-slate-200 bg-white h-[600px] shadow-md">
      <iframe
        src={url}
        title={title}
        className="w-full h-full border-0"
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      />
    </div>
  )
}

// ──────────────────────────────────────────────
// Inline action button chip — for single actionButtons entries
// ──────────────────────────────────────────────
function ActionChip({ btn }) {
  return (
    <a
      href={btn.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
        bg-teal-500/10 text-teal-600 hover:bg-teal-500/20 border border-teal-500/30
        dark:bg-teal-500/20 dark:text-teal-200 dark:hover:bg-teal-500/35 dark:border-teal-500/40
        transition-all duration-200 shadow-sm"
    >
      <ExternalLink size={12} />
      {btn.label}
    </a>
  )
}

// ──────────────────────────────────────────────
// Main panel
// ──────────────────────────────────────────────
export default function QualityControlPanel({ pageId: propPageId }) {
  const { pageId: paramPageId } = useParams()
  const pageId = propPageId || paramPageId
  const embedConfig = pageId ? allEmbeds[pageId] : null

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [key, setKey] = useState(0)
  const iframeRef = useRef(null)

  const refresh = () => {
    setLoading(true)
    setError(false)
    setKey(k => k + 1)
  }

  if (!embedConfig) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center">
        <AlertCircle size={48} className="text-slate-600 mb-4" />
        <h2 className="text-lg font-semibold dark:text-slate-300 light:text-slate-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-sm dark:text-slate-500 light:text-slate-400">
          No embed configuration found for ID: <code className="text-cyan-400">{pageId}</code>
        </p>
      </div>
    )
  }

  const urls = embedConfig.embedUrls || (embedConfig.embedUrl ? [embedConfig.embedUrl] : [])
  const isMulti = urls.length > 1
  const firstUrl = urls[0] || ''
  const isFirstUrlAppsScript = firstUrl.includes('script.google.com')

  return (
    <div className="p-5 h-full flex flex-col gap-4">
      {/* Page header */}
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold dark:text-white light:text-slate-800 mb-1">
            {embedConfig.title}
          </h2>
          <div className="w-16 h-1 bg-red-500 rounded-full mb-2" />
          <p className="text-xs dark:text-slate-500 light:text-slate-400">{embedConfig.subtitle}</p>
        </div>

        {/* Utility controls row */}
        <div className="flex items-center gap-2 flex-wrap justify-end flex-shrink-0">
          <button
            onClick={refresh}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
              dark:text-slate-400 light:text-slate-600
              dark:hover:text-cyan-400 light:hover:text-blue-600
              dark:hover:bg-white/5 light:hover:bg-slate-100
              border dark:border-slate-700/50 light:border-slate-200
              transition-all duration-200"
          >
            <RefreshCw size={12} className={loading && !isMulti && !isFirstUrlAppsScript ? 'spinner' : ''} />
            Refresh
          </button>

          {/* Inline action chips */}
          {embedConfig.actionButtons && embedConfig.actionButtons.map((btn, idx) => (
            <ActionChip key={idx} btn={btn} />
          ))}

          {/* Open link */}
          {firstUrl && !isFirstUrlAppsScript && !embedConfig.driveLinks && (
            <a
              href={firstUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                dark:text-slate-400 light:text-slate-600
                dark:hover:text-cyan-400 light:hover:text-blue-600
                dark:hover:bg-white/5 light:hover:bg-slate-100
                border dark:border-slate-700/50 light:border-slate-200
                transition-all duration-200"
            >
              <ExternalLink size={12} />
              Open
            </a>
          )}
        </div>
      </div>

      {/* Drive folder grid */}
      {embedConfig.driveLinks && (
        <DriveFolderGrid links={embedConfig.driveLinks} />
      )}

      {/* Iframe wrapper */}
      {isMulti ? (
        <div className="flex-1 overflow-y-auto space-y-6 pr-1">
          {urls.map((url, idx) => (
            <EmbedSlot
              key={idx}
              url={url}
              title={`${embedConfig.title} Part ${idx + 1}`}
            />
          ))}
        </div>
      ) : isFirstUrlAppsScript ? (
        <AppsScriptPanel url={firstUrl} title={embedConfig.title} />
      ) : (
        <div className="relative flex-1 min-h-[600px] rounded-xl overflow-hidden
          dark:border dark:border-slate-700/50 light:border light:border-slate-200
          dark:shadow-[0_0_30px_rgba(0,242,254,0.05)] light:shadow-md
          bg-white"
        >
          {loading && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10
              dark:bg-[#0a0f1c]/90 light:bg-white/90 backdrop-blur-sm rounded-xl">
              <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 spinner mb-4" />
              <p className="text-xs dark:text-slate-400 light:text-slate-500">กำลังโหลดแดชบอร์ด…</p>
              <p className="text-[10px] dark:text-slate-600 light:text-slate-400 mt-1">{embedConfig.title}</p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10
              dark:bg-[#0a0f1c]/90 light:bg-white/90 backdrop-blur-sm rounded-xl">
              <AlertCircle size={36} className="text-red-400 mb-3" />
              <p className="text-sm dark:text-slate-300 light:text-slate-700 mb-1">ไม่สามารถโหลดแดชบอร์ด</p>
              <p className="text-xs dark:text-slate-500 light:text-slate-400 mb-4">Dashboard failed to load</p>
              <button
                onClick={refresh}
                className="px-4 py-2 rounded-lg text-xs bg-cyan-500/10 text-cyan-400
                  border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
              >
                ลองใหม่อีกครั้ง / Retry
              </button>
            </div>
          )}

          <iframe
            key={key}
            ref={iframeRef}
            src={firstUrl}
            title={embedConfig.title}
            className="embed-frame"
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError(true) }}
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          />
        </div>
      )}
    </div>
  )
}
