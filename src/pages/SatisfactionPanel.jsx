import { useState } from 'react'
import { RefreshCw } from 'lucide-react'

const TABS = [
  { id: 'doctor',  label: 'แพทย์',           embeds: ['embeds/satisfy-doctor-1.html', 'embeds/satisfy-doctor-2.html'] },
  { id: 'nurse',   label: 'พยาบาล',          embeds: ['embeds/satisfy-nurse-1.html', 'embeds/satisfy-nurse-2.html'] },
  { id: 'staff',   label: 'เจ้าหน้าที่ รพ.สต.', embeds: ['embeds/satisfy-staff-1.html', 'embeds/satisfy-staff-2.html'] },
  { id: 'patient', label: 'ผู้รับบริการ',     embeds: ['embeds/satisfy-patient-1.html', 'embeds/satisfy-patient-2.html'] },
  { id: 'hstaff',  label: 'เจ้าหน้าที่โรงพยาบาล', embeds: ['embeds/satisfy-hstaff-1.html', 'embeds/satisfy-hstaff-2.html'] }
]

export default function SatisfactionPanel() {
  const [activeTabId, setActiveTabId] = useState('doctor')
  const [refreshKey, setRefreshKey] = useState(0)

  const activeTab = TABS.find(t => t.id === activeTabId) || TABS[0]

  return (
    <div className="p-5 h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          {/* Title with red accent bar — mirrors original Google Sites layout */}
          <h2 className="text-2xl font-bold dark:text-white light:text-slate-800 mb-1">
            แบบสอบถามความพึงพอใจ
          </h2>
          <div className="w-16 h-1 bg-red-500 rounded-full mb-2" />
          <p className="text-xs dark:text-slate-500 light:text-slate-400">Satisfaction Survey Dashboard</p>
        </div>

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
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto scrollbar-thin">
        {TABS.map(t => {
          const isActive = t.id === activeTabId
          return (
            <button
              key={t.id}
              onClick={() => setActiveTabId(t.id)}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-all duration-200
                ${isActive
                  ? 'border-cyan-500 text-cyan-500 bg-cyan-500/5'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Stacked Iframe dashboards */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1">
        {activeTab.embeds.map((url, idx) => (
          <div
            key={`${activeTab.id}-${idx}-${refreshKey}`}
            className="relative rounded-xl overflow-hidden border dark:border-slate-700/50 light:border-slate-200 bg-white h-[600px] shadow-md"
          >
            <iframe
              src={url}
              title={`${activeTab.label} Dashboard Part ${idx + 1}`}
              className="w-full h-full border-0"
              allow="fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

