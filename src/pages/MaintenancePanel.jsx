import { useState } from 'react'
import { RefreshCw, ExternalLink, ShieldAlert, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'
import config from '../config/config.json'

const devices = config.maintenanceDevices

// ──────────────────────────────────────────────
// AppsScriptPanel — Double-Experience Panel Layout for Maintenance
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
            เปิดระบบบันทึกข้อมูลบำรุงรักษา (หน้าต่างใหม่)
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

    </div>
  )
}

// ──────────────────────────────────────────────
// Per-slot renderer — iframe or Apps Script fallback
// ──────────────────────────────────────────────
function EmbedOrFallback({ url, title }) {
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
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      />
    </div>
  )
}

// ──────────────────────────────────────────────
// MaintenancePanel
// ──────────────────────────────────────────────
export default function MaintenancePanel({ deviceKey }) {
  const device = devices.find(d => d.key === deviceKey)
  const [refreshKey, setRefreshKey] = useState(0)

  if (!device) {
    return (
      <div className="p-6 text-center text-slate-500">
        Device not found: {deviceKey}
      </div>
    )
  }

  const urls = device.embedUrls || []
  // Primary external link — prefer the Apps Script exec URL for "Open Form"
  const formUrl = urls.find(u => u.includes('script.google.com')) || urls[0] || ''

  return (
    <div className="p-5 h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          {/* Title with red accent bar — mirrors original Google Sites layout */}
          <h2 className="text-2xl font-bold dark:text-white light:text-slate-800 mb-1">
            {device.name}
          </h2>
          <div className="w-16 h-1 bg-red-500 rounded-full mb-2" />
          <p className="text-xs dark:text-slate-500 light:text-slate-400">
            {device.model} • {device.type}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
              dark:text-slate-400 light:text-slate-600
              dark:hover:text-cyan-400 light:hover:text-blue-600
              dark:hover:bg-white/5 light:hover:bg-slate-100
              border dark:border-slate-700/50 light:border-slate-200
              transition-all duration-200"
          >
            <RefreshCw size={12} />
            Refresh
          </button>
          {formUrl && (
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                bg-teal-500/10 text-teal-600 hover:bg-teal-500/20 border border-teal-500/30
                dark:bg-teal-500/20 dark:text-teal-200 dark:hover:bg-teal-500/35 dark:border-teal-500/40
                transition-all duration-200 shadow-sm"
            >
              <ExternalLink size={12} />
              เปิดแบบฟอร์ม
            </a>
          )}
        </div>
      </div>

      {/* Stacked embed slots — each URL gets iframe or fallback card */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1" key={refreshKey}>
        {urls.map((url, idx) => (
          <EmbedOrFallback
            key={`${device.key}-${idx}`}
            url={url}
            title={`${device.name} — ${url.includes('script.google.com') ? 'แบบฟอร์มบันทึก' : `ประวัติ Part ${idx + 1}`}`}
          />
        ))}
      </div>
    </div>
  )
}
