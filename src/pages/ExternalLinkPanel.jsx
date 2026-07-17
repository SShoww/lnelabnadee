import { ExternalLink } from 'lucide-react'

export default function ExternalLinkPanel({ title, subtitle, description, url, buttonLabel }) {
  return (
    <div className="p-6 h-full flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Title Section with Red Underline Accent */}
      <div>
        <h2 className="text-3xl font-bold dark:text-white light:text-slate-800 mb-1">
          {title}
        </h2>
        <div className="w-16 h-1 bg-red-500 rounded-full mb-3" />
        <p className="text-sm dark:text-slate-400 light:text-slate-600 font-medium">
          {subtitle}
        </p>
      </div>

      {/* Content Card */}
      <div className="glass p-6 rounded-2xl border dark:border-slate-800/80 light:border-slate-200
        dark:bg-slate-900/40 light:bg-white shadow-xl flex flex-col gap-6">
        
        {/* Description */}
        <div className="text-sm dark:text-slate-300 light:text-slate-700 leading-relaxed space-y-3">
          <p>{description}</p>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-start mt-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white
              bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700
              shadow-lg shadow-red-500/20 hover:shadow-red-500/30 active:scale-[0.98]
              transition-all duration-200 group"
          >
            {buttonLabel}
            <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  )
}
