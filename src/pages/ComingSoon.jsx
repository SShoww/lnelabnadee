import { Construction } from 'lucide-react'

export default function ComingSoon({ title = 'Coming Soon', subtitle = '' }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10
        border border-cyan-500/20 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/10">
        <Construction size={28} className="text-cyan-400" />
      </div>
      <h2 className="text-xl font-bold dark:text-slate-200 light:text-slate-700 mb-2">{title}</h2>
      {subtitle && (
        <p className="text-sm dark:text-slate-500 light:text-slate-400 max-w-sm">{subtitle}</p>
      )}
      <p className="text-xs dark:text-slate-600 light:text-slate-300 mt-4">
        กำลังอยู่ระหว่างการพัฒนา — Under Migration
      </p>
    </div>
  )
}
