import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import {
  Home, FlaskConical, Activity, Wrench, ChevronDown, ChevronRight,
  Sun, Moon, Menu, Microscope, Beaker, Droplets, HeartPulse,
  TestTube2, BarChart3, LineChart, TrendingUp, AlertCircle, Cpu, FileText, Globe
} from 'lucide-react'
import config from '../config/config.json'

const embeds = config.crawledEmbeds
const devices = config.maintenanceDevices
const eqaEmbeds = config.eqaEmbeds
const iqcEmbeds = config.iqcEmbeds
const rluEmbeds = config.rluEmbeds

// Group embeds by category
const categories = ['Microscopic', 'POCT', 'Chemistry', 'Hematology', 'Serology']
const categoryIcons = {
  Microscopic: Microscope,
  POCT: TestTube2,
  Chemistry: Beaker,
  Hematology: Droplets,
  Serology: HeartPulse,
}

function NavGroup({ label, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium hover:text-teal-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 group text-slate-500 dark:text-slate-400"
      >
        <span className="flex items-center gap-2">
          <Icon size={15} className="opacity-70 group-hover:opacity-100" />
          {label}
        </span>
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
      </button>
      {open && <div className="ml-2 mt-0.5 border-l border-slate-700/50 pl-2 space-y-0.5">{children}</div>}
    </div>
  )
}

function SidebarLink({ to, children, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
          isActive
            ? 'sidebar-item-active text-teal-700 dark:text-cyan-300 font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function DashboardLayout({ children }) {
  const { theme, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Auto-close mobile sidebar on route change
  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

  const isQC = location.pathname.startsWith('/quality-control')

  const Sidebar = (
    <aside className={`
      glass h-screen w-72 flex-shrink-0 flex flex-col
      bg-white/90 dark:bg-[rgba(7,11,19,0.85)]
      border-r border-slate-200 dark:border-slate-800/80
      transition-colors duration-300
    `}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-200 dark:border-slate-800/60">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <FlaskConical size={14} className="text-white" />
              </div>
              <span className="glow-text font-bold text-base tracking-wide">LNELABNADEE</span>
            </div>
            <p className="text-[10px] text-slate-500 pl-9 leading-tight">กลุ่มงานเทคนิคการแพทย์ รพ.นาดี</p>
          </div>
          {/* Status dot */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 status-pulse" title="System Online" />
            <span className="text-[9px] text-emerald-400/70">online</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 text-sm">

        <SidebarLink to="/" end>
          <Home size={14} /> หน้าแรก
        </SidebarLink>

        <SidebarLink to="/work-instruction">
          <FileText size={14} /> Work Instruction
        </SidebarLink>

        {/* Quality Work */}
        <NavGroup label="งานคุณภาพ" icon={Activity}>
          <SidebarLink to="/quality-work/satisfaction"><BarChart3 size={12} /> แบบสอบถามความพึงพอใจ</SidebarLink>
          <SidebarLink to="/quality-work/workload"><TrendingUp size={12} /> Work Load</SidebarLink>
          <SidebarLink to="/quality-work/comparison"><LineChart size={12} /> Comparison Test</SidebarLink>
          <SidebarLink to="/quality-work/consult"><AlertCircle size={12} /> บันทึกให้คำปรึกษา</SidebarLink>
          <SidebarLink to="/quality-work/risk"><AlertCircle size={12} /> RISK</SidebarLink>
          <SidebarLink to="/quality-work/tat"><Activity size={12} /> Turn Around Time</SidebarLink>
          <SidebarLink to="/quality-work/poct-dtx"><TestTube2 size={12} /> POCT DTX รพ.สต.</SidebarLink>
          <SidebarLink to="/quality-work/eqa-correction"><AlertCircle size={12} /> บันทึกแก้ไข EQA</SidebarLink>
        </NavGroup>

        {/* Quality Control */}
        <NavGroup label="Quality Control" icon={Activity} defaultOpen={isQC}>
          <NavGroup label="LAB Performance" icon={BarChart3} defaultOpen={isQC}>
            {categories.map(cat => {
              const catEmbeds = Object.values(embeds).filter(e => e.category === cat)
              if (!catEmbeds.length) return null
              const CatIcon = categoryIcons[cat] || BarChart3
              return (
                <NavGroup key={cat} label={cat} icon={CatIcon} defaultOpen={isQC}>
                  {catEmbeds.map(e => (
                    <SidebarLink key={e.pageId} to={e.routePath}>
                      <BarChart3 size={11} /> {e.title}
                    </SidebarLink>
                  ))}
                </NavGroup>
              )
            })}
          </NavGroup>
          <NavGroup label="EQA Programs" icon={FlaskConical}>
            <SidebarLink to="/performance/eqa-portals"><Globe size={11} /> ระบบลงผล EQA</SidebarLink>
            {Object.values(eqaEmbeds).map(e => (
              <SidebarLink key={e.pageId} to={e.routePath}><BarChart3 size={11} /> {e.title}</SidebarLink>
            ))}
            <SidebarLink to="/quality-control/eqa/bloodbank"><FlaskConical size={11} /> EQA Bloodbank</SidebarLink>
            <SidebarLink to="/quality-control/eqa/microscopic"><Microscope size={11} /> EQA Microscopic</SidebarLink>
            <SidebarLink to="/quality-control/eqa/microbiology"><Microscope size={11} /> EQA Microbiology</SidebarLink>
          </NavGroup>
          <NavGroup label="IQC" icon={Activity}>
            {Object.values(iqcEmbeds).map(e => (
              <SidebarLink key={e.pageId} to={e.routePath}><LineChart size={11} /> {e.title}</SidebarLink>
            ))}
          </NavGroup>
        </NavGroup>

        {/* RLU */}
        <NavGroup label="RLU" icon={Cpu}>
          {Object.values(rluEmbeds).map(e => (
            <SidebarLink key={e.pageId} to={e.routePath}><BarChart3 size={11} /> {e.title}</SidebarLink>
          ))}
        </NavGroup>

        {/* Maintenance */}
        <NavGroup label="Maintenance" icon={Wrench}>
          {devices.map(d => (
            <SidebarLink key={d.key} to={d.route}>
              <Cpu size={11} /> {d.name}
            </SidebarLink>
          ))}
        </NavGroup>

      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t text-[10px] text-slate-500 border-slate-200 dark:border-slate-800/60">
        <p>LNELABNADEE Portal v2.0</p>
        <p>โรงพยาบาลนาดี • กลุ่มงานเทคนิคการแพทย์</p>
      </div>
    </aside>
  )

  return (
    <div className={`flex h-screen overflow-hidden dark-mesh ${theme}`}>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">{Sidebar}</div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full">
            {Sidebar}
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header bar */}
        <header className="glass flex items-center justify-between px-5 py-3 border-b backdrop-blur-xl z-10 bg-white/80 border-slate-200 dark:bg-[rgba(7,11,19,0.6)] dark:border-slate-800/60">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-lg dark:text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Medical Technology Division
              </h1>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                โรงพยาบาลนาดี — KPI & LAB Performance Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark/Light toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-cyan-400"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Live timestamp */}
            <span className="hidden md:block text-[10px] tabular-nums text-slate-400 dark:text-slate-500">
              {new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
