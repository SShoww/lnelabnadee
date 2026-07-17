import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import DashboardLayout from './components/DashboardLayout'
import QualityControlPanel from './components/QualityControlPanel'
import HomePage from './pages/HomePage'
import ComingSoon from './pages/ComingSoon'
import SatisfactionPanel from './pages/SatisfactionPanel'
import MaintenancePanel from './pages/MaintenancePanel'
import ExternalLinkPanel from './pages/ExternalLinkPanel'
import EqaPortalsPage from './pages/EqaPortalsPage'
import config from './config/config.json'

const embeds = config.crawledEmbeds
const qwEmbeds = config.qualityWorkEmbeds
const devices = config.maintenanceDevices
const eqaEmbeds = config.eqaEmbeds
const iqcEmbeds = config.iqcEmbeds
const rluEmbeds = config.rluEmbeds

export default function App() {
  return (
    <ThemeProvider>
      <DashboardLayout>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* EQA Portals */}
          <Route path="/performance/eqa-portals" element={<EqaPortalsPage />} />

          {/* ── Quality Control: LAB Performance (14 live iframe dashboards) ── */}
          {Object.values(embeds).map(embed => (
            <Route
              key={embed.pageId}
              path={embed.routePath}
              element={<QualityControlPanel pageId={embed.pageId} source="crawledEmbeds" />}
            />
          ))}

          {/* QC index redirect */}
          <Route path="/quality-control" element={<Navigate to="/quality-control/performance/microscopic" replace />} />
          <Route path="/quality-control/performance" element={<Navigate to="/quality-control/performance/microscopic" replace />} />

          {/* QC placeholders */}
          <Route path="/quality-control/eqa" element={<Navigate to="/quality-control/eqa/chemistry" replace />} />
          {Object.values(eqaEmbeds).map(embed => (
            <Route
              key={embed.pageId}
              path={embed.routePath}
              element={<QualityControlPanel pageId={embed.pageId} source="eqaEmbeds" />}
            />
          ))}
          <Route
            path="/quality-control/eqa/bloodbank"
            element={
              <ExternalLinkPanel
                title="EQA Bloodbank"
                subtitle="Proficiency Testing in Blood Bank Laboratory"
                description="ระบบประเมินคุณภาพห้องปฏิบัติการธนาคารเลือดภายนอกองค์กร (EQA Blood bank) สำหรับส่งผลการทดสอบ ตรวจสอบความถูกต้อง และติดตามประวัติคุณภาพ"
                url="https://pt.dmsc.moph.go.th/"
                buttonLabel="เข้าสู่ระบบส่งผล EQA Bloodbank"
              />
            }
          />
          <Route
            path="/quality-control/eqa/microscopic"
            element={
              <ExternalLinkPanel
                title="EQA Microscopic"
                subtitle="Proficiency Testing in Microscopic Examination"
                description="ระบบประเมินคุณภาพการตรวจวิเคราะห์เซลล์และสิ่งส่งตรวจด้วยกล้องจุลทรรศน์ (EQA Microscopic) สำหรับบันทึกผลการประเมินประจำรอบ"
                url="https://pt.dmsc.moph.go.th/"
                buttonLabel="เข้าสู่ระบบส่งผล EQA Microscopic"
              />
            }
          />
          <Route
            path="/quality-control/eqa/microbiology"
            element={
              <ExternalLinkPanel
                title="EQA Microbiology"
                subtitle="Proficiency Testing in Clinical Microbiology"
                description="ระบบควบคุมคุณภาพจุลชีววิทยาคลินิกภายนอกองค์กร (EQA Microbiology) เพื่อทดสอบความชำนาญในการตรวจวินิจฉัยเชื้อแบคทีเรียและการทดสอบความไวต่อยา"
                url="https://pt.dmsc.moph.go.th/"
                buttonLabel="เข้าสู่ระบบส่งผล EQA Microbiology"
              />
            }
          />


          <Route path="/quality-control/iqc" element={<Navigate to="/quality-control/iqc/cv" replace />} />
          {Object.values(iqcEmbeds).map(embed => (
            <Route
              key={embed.pageId}
              path={embed.routePath}
              element={<QualityControlPanel pageId={embed.pageId} source="iqcEmbeds" />}
            />
          ))}

          {/* ── Quality Work ── */}
          <Route path="/quality-work/satisfaction" element={<SatisfactionPanel />} />
          {Object.values(qwEmbeds).map(embed => (
            <Route
              key={embed.pageId}
              path={embed.routePath}
              element={<QualityControlPanel pageId={embed.pageId} source="qualityWorkEmbeds" />}
            />
          ))}
          <Route
            path="/quality-work/risk"
            element={
              <ExternalLinkPanel
                title="RISK"
                subtitle="National Risk Report & Learning System (NRLS)"
                description="ระบบรายงานและเรียนรู้อุบัติการณ์ความเสี่ยงระดับประเทศ (NRLS) เพื่อบันทึก ค้นหา เรียนรู้ และรายงานข้อมูลความเสี่ยงในการให้บริการทางเทคนิคการแพทย์ โรงพยาบาลนาดี"
                url="https://nad.thai-nrls.org"
                buttonLabel="เข้าสู่ระบบรายงานความเสี่ยง NRLS"
              />
            }
          />


          {/* ── RLU ── */}
          {Object.values(rluEmbeds).map(embed => (
            <Route
              key={embed.pageId}
              path={embed.routePath}
              element={<QualityControlPanel pageId={embed.pageId} source="rluEmbeds" />}
            />
          ))}

          {/* ── Work Instruction ── */}
          <Route
            path="/work-instruction"
            element={<QualityControlPanel pageId="work-instruction" />}
          />

          {/* ── Maintenance (5 devices with form submissions) ── */}
          {devices.map(d => (
            <Route
              key={d.key}
              path={d.route}
              element={<MaintenancePanel deviceKey={d.key} />}
            />
          ))}

          {/* 404 */}
          <Route path="*" element={<ComingSoon title="404 — Page Not Found" subtitle="This route does not exist." />} />
        </Routes>
      </DashboardLayout>
    </ThemeProvider>
  )
}
