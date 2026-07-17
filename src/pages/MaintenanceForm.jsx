import { useState } from 'react'
import { Wrench, CheckCircle2, XCircle, Send, AlertCircle, RotateCcw } from 'lucide-react'
import config from '../config/config.json'

const webhooks = config.webhookUrls
const devices = config.maintenanceDevices

// Shared checklist items per instrument type
// ponytail: hardcoded is fine — these don't change often; YAGNI to make them config-driven
const CHECKLISTS = {
  'Luminescence Analyzer': [
    'ตรวจสอบระดับ Reagent และ Wash Solution',
    'ทำความสะอาด Reaction Chamber',
    'ตรวจสอบ Light Path / Detector',
    'Run QC และบันทึกผล',
    'ตรวจสอบ Printout / Connection',
    'ทำความสะอาดภายนอกเครื่อง',
  ],
  'Coagulation Analyzer': [
    'ตรวจสอบระดับ Reagent (Thromboplastin, CaCl₂)',
    'Prime System / ล้างท่อ',
    'ตรวจสอบ Cuvette Supply',
    'Run Normal + Abnormal QC',
    'ตรวจสอบ Temperature (37°C ±0.5)',
    'ทำความสะอาดภายนอกเครื่อง',
  ],
  'Chemistry Analyzer': [
    'ตรวจสอบระดับ Reagent ทุก Module',
    'ตรวจสอบ Diluent / Wash Buffer',
    'ทำความสะอาด Probe และ Cuvette',
    'Run Multi-Level QC',
    'ตรวจสอบ Calibration Status',
    'ตรวจสอบน้ำ DI / Waste Container',
    'ทำความสะอาดภายนอกเครื่อง',
  ],
  'Hematology Analyzer': [
    'ตรวจสอบระดับ Lyse, Diluent, Rinse',
    'ทำ Background Count (Blank)',
    'Run 3-Level QC (Low/Normal/High)',
    'ตรวจสอบ Diff Mode / Flag Rate',
    'ล้าง Flow Cell (Cleanser)',
    'ตรวจสอบ Waste Container',
    'ทำความสะอาดภายนอกเครื่อง',
  ],
  'Urine Analyzer': [
    'ตรวจสอบ Strip Supply',
    'ทำความสะอาด Optical Chamber',
    'Run QC Strip / Control',
    'ตรวจสอบ Camera / Lighting',
    'ล้าง Sample Tray',
    'ทำความสะอาดภายนอกเครื่อง',
  ],
}

function CheckItem({ label, checked, onChange }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group py-1.5">
      <span
        onClick={onChange}
        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200
          ${checked
            ? 'bg-emerald-500 border-emerald-500'
            : 'dark:border-slate-600 group-hover:border-emerald-400/60' border-slate-300 bg-white dark:bg-white/5
          }`}
      >
        {checked && <CheckCircle2 size={12} className="text-white" />}
      </span>
      <span className={`text-sm leading-snug transition-colors duration-200
        ${checked
          ? 'line-through text-slate-400' dark:text-slate-500
          : 'dark:text-slate-300 text-slate-700'
        }`}>
        {label}
      </span>
    </label>
  )
}

export default function MaintenanceForm({ deviceKey }) {
  const device = devices.find(d => d.key === deviceKey)
  const items = device ? (CHECKLISTS[device.type] || []) : []
  const webhookUrl = device ? webhooks[device.key] : null

  const [checks, setChecks] = useState(() => Object.fromEntries(items.map(i => [i, false])))
  const [technician, setTechnician] = useState('')
  const [remarks, setRemarks] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const toggle = item => setChecks(c => ({ ...c, [item]: !c[item] }))

  const checkedCount = Object.values(checks).filter(Boolean).length
  const allDone = checkedCount === items.length

  const reset = () => {
    setChecks(Object.fromEntries(items.map(i => [i, false])))
    setTechnician('')
    setRemarks('')
    setStatus('idle')
  }

  const submit = async () => {
    if (!technician.trim()) return
    setStatus('sending')

    const payload = new URLSearchParams({
      device: device.name,
      model: device.model,
      technician: technician.trim(),
      date: new Date().toLocaleDateString('th-TH'),
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      checklist: items.map(i => `${checks[i] ? '✓' : '✗'} ${i}`).join('\n'),
      allChecked: allDone ? 'Yes' : 'No',
      remarks: remarks.trim(),
    })

    try {
      // ponytail: no-cors because Apps Script doesn't set CORS headers; response is opaque but POST succeeds
      await fetch(webhookUrl, { method: 'POST', mode: 'no-cors', body: payload })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center">
        <AlertCircle size={48} className="text-slate-600 mb-4" />
        <h2 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">Device Not Found</h2>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500
            flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Wrench size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{device.name}</h2>
            <div className="w-16 h-1 bg-red-500 rounded-full mt-1" />
          </div>
        </div>
        <p className="text-xs mt-2 text-slate-400 dark:text-slate-500">
          {device.model} • {device.type} • {new Date().toLocaleDateString('th-TH', { dateStyle: 'long' })}
        </p>
      </div>

      {/* Success state */}
      {status === 'success' && (
        <div className="rounded-xl p-6 bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
          <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
          <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            บันทึกการตรวจสอบเรียบร้อยแล้ว
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ส่งข้อมูลไปยัง Google Sheets สำเร็จ
          </p>
          <button
            onClick={reset}
            className="mt-2 flex items-center gap-2 mx-auto px-4 py-2 rounded-lg text-xs
              bg-emerald-500/10 text-emerald-400 border border-emerald-500/20
              hover:bg-emerald-500/20 transition-all"
          >
            <RotateCcw size={12} /> บันทึกรายการใหม่
          </button>
        </div>
      )}

      {status !== 'success' && (
        <>
          {/* Technician field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              ผู้ตรวจสอบ <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={technician}
              onChange={e => setTechnician(e.target.value)}
              placeholder="ชื่อ-นามสกุล ผู้ตรวจสอบ"
              className="w-full rounded-lg px-3 py-2 text-sm border focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all duration-200 bg-white border-slate-200 text-slate-800 placeholder-slate-400 dark:bg-white/5 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-600"
            />
          </div>

          {/* Checklist */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                รายการตรวจสอบประจำวัน
              </label>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                {checkedCount} / {items.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-500
                  ${allDone ? 'bg-emerald-400' : 'bg-cyan-400'}`}
                style={{ width: `${(checkedCount / items.length) * 100}%` }}
              />
            </div>

            <div className="rounded-xl border p-4 space-y-0.5 bg-slate-50 border-slate-200 dark:bg-white/[0.02] dark:border-slate-700/50">
              {items.map(item => (
                <CheckItem
                  key={item}
                  label={item}
                  checked={checks[item]}
                  onChange={() => toggle(item)}
                />
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
              หมายเหตุ / ปัญหาที่พบ
            </label>
            <textarea
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              rows={3}
              placeholder="ระบุปัญหาหรือหมายเหตุเพิ่มเติม (ถ้ามี)"
              className="w-full rounded-lg px-3 py-2 text-sm resize-none border focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all duration-200 bg-white border-slate-200 text-slate-800 placeholder-slate-400 dark:bg-white/5 dark:border-slate-700 dark:text-slate-200 dark:placeholder-slate-600"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3">
            <button
              onClick={submit}
              disabled={!technician.trim() || status === 'sending'}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium
                bg-gradient-to-r from-cyan-500 to-blue-500 text-white
                hover:from-cyan-400 hover:to-blue-400
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200 shadow-lg shadow-cyan-500/20"
            >
              {status === 'sending'
                ? <><div className="w-3.5 h-3.5 rounded-full border border-white/40 border-t-white spinner" /> กำลังส่ง…</>
                : <><Send size={13} /> บันทึกการตรวจสอบ</>
              }
            </button>

            {!allDone && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                ยังมี {items.length - checkedCount} รายการที่ยังไม่ได้ตรวจสอบ
              </span>
            )}

            {status === 'error' && (
              <span className="flex items-center gap-1 text-xs text-red-400">
                <XCircle size={12} /> ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
