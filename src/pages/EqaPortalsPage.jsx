import { ExternalLink, Globe, Award, Shield, CheckCircle2 } from 'lucide-react'

const portals = [
  {
    title: "EQA มหิดล",
    subtitle: "MUMT EQA Portal",
    url: "https://eqamt.mahidol.ac.th/eqasmumt-2026/",
    description: "ระบบจัดส่งผลและประเมินประสิทธิภาพ EQA คณะเทคนิคการแพทย์ มหาวิทยาลัยมหิดล",
    icon: Award,
    colorClass: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400"
  },
  {
    title: "EQA กรมวิทย์",
    subtitle: "DMSC MOPH PT Portal",
    url: "https://ptapi.dmsc.moph.go.th/login",
    description: "ระบบประเมินคุณภาพการวิเคราะห์ทางห้องปฏิบัติการ กรมวิทยาศาสตร์การแพทย์",
    icon: Shield,
    colorClass: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400"
  },
  {
    title: "EQA WEWED",
    subtitle: "WEWED EQA Portal",
    url: "https://wemedlab.com/eqa/",
    description: "ระบบจัดการและรายงานผลคุณภาพโครงการตรวจประเมิน EQA WEWED",
    icon: CheckCircle2,
    colorClass: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400"
  }
]

export default function EqaPortalsPage() {
  return (
    <div className="p-6 h-full flex flex-col gap-6 overflow-y-auto">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2 text-slate-800 dark:text-white">
          <Globe className="text-teal-400" />
          EQA External Portals
        </h2>
        {/* Red accent bar under the title */}
        <div className="w-16 h-1 bg-red-500 rounded-full mb-2" />
        <p className="text-xs text-slate-400 dark:text-slate-500">
          ลิงก์เชื่อมต่อระบบลงทะเบียน บันทึกผล และดูผลการประเมินคุณภาพภายนอก (External Quality Assessment)
        </p>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portals.map((p, idx) => {
          const Icon = p.icon
          return (
            <div
              key={idx}
              className={`
                glass-card rounded-2xl border p-6 flex flex-col justify-between
                bg-gradient-to-br ${p.colorClass.split(' ')[0]} ${p.colorClass.split(' ')[1]} ${p.colorClass.split(' ')[2]}
                bg-white dark:bg-[#0c1220]/60
                hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]
                transition-all duration-300 hover:-translate-y-1
              `}
            >
              <div>
                {/* Card Header Icon & Subtitle */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-800/40 dark:bg-slate-900/60 border border-slate-700/50 flex items-center justify-center">
                    <Icon size={20} className={p.colorClass.split(' ')[3]} />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">{p.subtitle}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-6 text-slate-600 dark:text-slate-400">
                  {p.description}
                </p>
              </div>

              {/* Action Button */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold
                  bg-teal-500/10 text-teal-600 hover:bg-teal-500/20 border border-teal-500/30
                  dark:bg-teal-500/20 dark:text-teal-200 dark:hover:bg-teal-500/30 dark:border-teal-500/40
                  transition-all duration-200 shadow-sm
                "
              >
                <ExternalLink size={13} />
                เปิดระบบลงผล (หน้าต่างใหม่)
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
