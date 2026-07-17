import { Construction } from 'lucide-react'

export default function ComingSoon({ title = 'Coming Soon', subtitle = '' }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10
        border border-cyan-500/20 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/10">
        <Construction size={28} className="text-cyan-400" />
      </div>
      <h2 className="text-xl font-bold mb-2 text-slate-700 dark:text-slate-200">{title}</h2>
      {subtitle && (
        <p className="text-sm max-w-sm text-slate-400 dark:text-slate-500">{subtitle}</p>
      )}
      <p className="text-xs mt-4 text-slate-300 dark:text-slate-600">
        กำลังอยู่ระหว่างการพัฒนา — Under Migration
      </p>
    </div>
  )
}
