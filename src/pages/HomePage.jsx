import { Activity, FlaskConical, TestTube2, HeartPulse, BarChart3, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import config from '../config/config.json'

const embeds = Object.values(config.crawledEmbeds)

const categoryColors = {
  Microscopic: 'from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-300',
  POCT:        'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
  Chemistry:   'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-300',
  Hematology:  'from-red-500/20 to-pink-500/10 border-red-500/30 text-red-300',
  Serology:    'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
}

const categoryCounts = embeds.reduce((acc, e) => {
  acc[e.category] = (acc[e.category] || 0) + 1
  return acc
}, {})

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="p-6 space-y-8">
      {/* Hero */}
      <div className="rounded-2xl overflow-hidden relative
        bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent
        border dark:border-cyan-500/20 light:border-cyan-300/40 p-8">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #00f2fe 0%, transparent 60%)' }} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500
              flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <FlaskConical size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold glow-text">LNELABNADEE Portal</h1>
              <p className="text-xs dark:text-slate-400 light:text-slate-500">
                KPI & LAB Performance Dashboard • กลุ่มงานเทคนิคการแพทย์ โรงพยาบาลนาดี
              </p>
            </div>
          </div>
          <p className="text-sm dark:text-slate-300 light:text-slate-600 max-w-xl leading-relaxed">
            ระบบติดตามผลการดำเนินงานของห้องปฏิบัติการทางการแพทย์ครบวงจร
            ครอบคลุม EQA, IQC, Sigma Metrics, และ Cumulative CV ทุกแผนก
          </p>
        </div>
      </div>

      {/* KPI summary cards by category */}
      <div>
        <h2 className="text-sm font-semibold dark:text-slate-400 light:text-slate-500
          uppercase tracking-wider mb-4">
          LAB Performance Sections
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => navigate(embeds.find(e => e.category === cat)?.routePath || '/')}
              className={`rounded-xl p-4 border text-left transition-all duration-200
                hover:scale-105 hover:shadow-lg bg-gradient-to-br
                ${categoryColors[cat] || 'from-slate-500/10 to-slate-500/5 border-slate-500/20 text-slate-300'}
              `}
            >
              <BarChart3 size={20} className="mb-2 opacity-70" />
              <div className="text-xs font-semibold mb-0.5">{cat}</div>
              <div className="text-[10px] dark:text-slate-500 light:text-slate-400">{count} dashboards</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick access — all 14 dashboards */}
      <div>
        <h2 className="text-sm font-semibold dark:text-slate-400 light:text-slate-500
          uppercase tracking-wider mb-4">
          Quick Access — All Dashboards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
          {embeds.map(e => (
            <button
              key={e.pageId}
              onClick={() => navigate(e.routePath)}
              className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3
                border dark:border-slate-700/50 light:border-slate-200
                dark:bg-white/[0.02] light:bg-white
                dark:hover:border-cyan-500/30 light:hover:border-cyan-400/50
                dark:hover:bg-white/5 light:hover:bg-slate-50
                transition-all duration-200 text-left"
            >
              <div>
                <div className="text-sm font-medium dark:text-slate-200 light:text-slate-700
                  group-hover:text-cyan-400 transition-colors">
                  {e.title}
                </div>
                <div className="text-[10px] dark:text-slate-500 light:text-slate-400">{e.subtitle}</div>
              </div>
              <ArrowRight size={14} className="flex-shrink-0 dark:text-slate-600 light:text-slate-400
                group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-200" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
