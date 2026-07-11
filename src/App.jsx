import React, { useState, useEffect } from 'react';

// Translation dictionary
const t = {
  th: {
    portalName: 'LNELABNADEE',
    hospitalSub: 'กลุ่มงานเทคนิคการแพทย์โรงพยาบาลนาดี',
    langToggle: 'EN',
    home: 'หน้าแรก',
    qualityWork: 'งานคุณภาพ',
    rluMetabase: 'RLU Metabase',
    qualityControl: 'Quality Control',
    maintenance: 'Maintenance',
    
    // Submenu links
    satisfaction: 'แบบสอบถามความพึงพอใจ',
    masterList: 'Master list',
    workLoad: 'Work Load',
    comparison: 'Comparison test',
    consultation: 'บันทึกให้คำปรึกษา',
    risk: 'RISK',
    tat: 'Turn Around Time',
    
    labPerf: 'LAB Performance',
    eqa: 'EQA',
    iqc: 'IQC',
    eqaCorrective: 'บันทึกแก้ไข EQA',
    
    // Common labels
    lastUpdated: 'อัปเดตระบบล่าสุดเมื่อ: 11 กรกฎาคม 2026',
    operator: 'ผู้บันทึก',
    save: 'บันทึกข้อมูล',
    cancel: 'ยกเลิก',
    addEntry: 'เพิ่มบันทึกใหม่',
    status: 'สถานะ',
    date: 'วันที่',
    action: 'การดำเนินการ',
    embedSettings: 'ตั้งค่าลิงก์ฝัง (Embed Settings)',
    embedUrlLabel: 'ลิงก์ Iframe (เช่น Google Forms, Sheets หรือ Metabase)',
    saveSettings: 'บันทึกการตั้งค่า',
    activeEmbed: 'แสดงการฝังจริง',
    mockDashboard: 'แสดงแดชบอร์ดจำลอง (Interactive Mock)',
    noEmbedUrl: 'ยังไม่ได้ตั้งค่าลิงก์เชื่อมต่อ คลิกไอคอนฟันเฟืองเพื่อตั้งค่าลิงก์จริงของคุณ',
    
    // Maintenance Labels
    dailyChecklist: 'รายการตรวจสอบประจำวัน',
    weeklyChecklist: 'รายการตรวจสอบประจำสัปดาห์',
    notes: 'หมายเหตุ / รายละเอียดการซ่อมบำรุง',
    checkSuccess: 'บันทึกการเช็คลิสต์ประจำวันเรียบร้อยแล้ว',
    deviceStatus: 'สถานะเครื่องมือ',
    ready: 'พร้อมใช้งาน',
    needsMaintenance: 'รอการซ่อมบำรุง',
    
    // Survey labels
    doctorSatisfy: 'ความพึงพอใจแพทย์',
    nurseSatisfy: 'ความพึงพอใจพยาบาล',
    staffSatisfy: 'ความพึงพอใจเจ้าหน้าที่ รพ.สต.',
    patientSatisfy: 'ความพึงพอใจผู้รับบริการ',
    hospitalStaffSatisfy: 'ความพึงพอใจเจ้าหน้าที่โรงพยาบาลนาดี',
    ratingQuestion: 'ระดับความพึงพอใจการให้บริการห้องปฏิบัติการ',
    feedbackPlaceholder: 'ข้อเสนอแนะเพิ่มเติม...',
    submitSurvey: 'ส่งแบบสอบถาม',
    surveySuccess: 'ขอบคุณที่ส่งแบบประเมินความพึงพอใจ'
  },
  en: {
    portalName: 'LNELABNADEE',
    hospitalSub: 'Medical Technology Division, Na Dee Hospital',
    langToggle: 'TH',
    home: 'Home',
    qualityWork: 'Quality Work',
    rluMetabase: 'RLU Metabase',
    qualityControl: 'Quality Control',
    maintenance: 'Maintenance',
    
    // Submenu links
    satisfaction: 'Satisfaction Surveys',
    masterList: 'Document Master List',
    workLoad: 'Work Load',
    comparison: 'Comparison Test',
    consultation: 'Consultation Log',
    risk: 'Risk Logs',
    tat: 'Turn Around Time',
    
    labPerf: 'LAB Performance',
    eqa: 'EQA',
    iqc: 'IQC',
    eqaCorrective: 'EQA Corrective Actions',
    
    // Common labels
    lastUpdated: 'System last updated: July 11, 2026',
    operator: 'Operator',
    save: 'Save Log',
    cancel: 'Cancel',
    addEntry: 'Add New Log',
    status: 'Status',
    date: 'Date',
    action: 'Action',
    embedSettings: 'Embed Settings',
    embedUrlLabel: 'Iframe Source URL (e.g. Google Forms, Sheets or Metabase)',
    saveSettings: 'Save Settings',
    activeEmbed: 'Show Real Embed',
    mockDashboard: 'Show Interactive Mock Dashboard',
    noEmbedUrl: 'No embed link configured. Click the gear icon to set up your real document embed.',
    
    // Maintenance Labels
    dailyChecklist: 'Daily Checklist',
    weeklyChecklist: 'Weekly Checklist',
    notes: 'Maintenance Notes / Details',
    checkSuccess: 'Daily checklist logged successfully',
    deviceStatus: 'Device Status',
    ready: 'Ready',
    needsMaintenance: 'Needs Maintenance',
    
    // Survey labels
    doctorSatisfy: 'Physician Satisfaction',
    nurseSatisfy: 'Nurse Satisfaction',
    staffSatisfy: 'Health Center Staff Satisfaction',
    patientSatisfy: 'Customer/Patient Satisfaction',
    hospitalStaffSatisfy: 'Na Dee Hospital Staff Satisfaction',
    ratingQuestion: 'Laboratory Service Satisfaction Level',
    feedbackPlaceholder: 'Additional feedback or suggestions...',
    submitSurvey: 'Submit Survey',
    surveySuccess: 'Thank you for your feedback!'
  }
};

const DEFAULT_EMBEDS = {
  rlu_dashboard: 'https://metabase.example.com/public/dashboard/xyz123',
  quality_manual: 'https://docs.google.com/document/d/example-qm/preview',
  work_procedure: 'https://docs.google.com/document/d/example-wp/preview',
  work_instruction: 'https://docs.google.com/document/d/example-wi/preview',
  form: 'https://docs.google.com/document/d/example-form/preview',
  supportive_document: 'https://docs.google.com/document/d/example-sd/preview',
  'master-dmsc': 'https://data.dmsc.moph.go.th/mes/auth'
};

function App() {
  const [lang, setLang] = useState('th');
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Collapse menu groups state
  const [menuCollapse, setMenuCollapse] = useState({
    qualityWork: false,
    qualityControl: false,
    maintenance: false
  });

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPageId, setModalPageId] = useState('');
  const [tempEmbedUrl, setTempEmbedUrl] = useState('');

  // Persisted settings
  const [embedUrls, setEmbedUrls] = useState({});
  const [showRealEmbed, setShowRealEmbed] = useState({});
  const [deviceLogs, setDeviceLogs] = useState({});
  const [checklistState, setChecklistState] = useState({});

  // Survey responses
  const [surveyRating, setSurveyRating] = useState(5);
  const [surveyComment, setSurveyComment] = useState('');
  const [surveyNotification, setSurveyNotification] = useState('');

  const [metabaseBaseUrl, setMetabaseBaseUrl] = useState(
    () => localStorage.getItem('lnelab_metabase_base') || 'https://nonbusiness-sibyl-unvilified.ngrok-free.dev/public/dashboard/'
  );
  const [metabaseUuids, setMetabaseUuids] = useState(() => {
    const saved = localStorage.getItem('lnelab_metabase_uuids');
    return saved ? JSON.parse(saved) : {
      overall: 'bce4405c-ec7a-4d86-acbc-dca894c78d94',
      hba1c: 'hba1c-analysis-uuid',
      ldl: 'ldl-monitoring-uuid'
    };
  });
  const [selectedMetabaseTab, setSelectedMetabaseTab] = useState('overall');

  // Modal Metabase inputs temp state
  const [tempMetabaseBase, setTempMetabaseBase] = useState('');
  const [tempMetabaseUuids, setTempMetabaseUuids] = useState({ overall: '', hba1c: '', ldl: '' });

  // Load from localStorage and apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('lnelab_theme') || 'dark';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);

    const savedUrls = localStorage.getItem('lnelab_embed_urls');
    if (savedUrls) setEmbedUrls(JSON.parse(savedUrls));
    
    const savedModes = localStorage.getItem('lnelab_show_real_embed');
    if (savedModes) setShowRealEmbed(JSON.parse(savedModes));

    const savedLogs = localStorage.getItem('lnelab_device_logs');
    if (savedLogs) setDeviceLogs(JSON.parse(savedLogs));

    const savedChecklists = localStorage.getItem('lnelab_checklists');
    if (savedChecklists) setChecklistState(JSON.parse(savedChecklists));
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('lnelab_theme', nextTheme);
  };

  const toggleLang = () => {
    setLang(prev => (prev === 'th' ? 'en' : 'th'));
  };

  const toggleGroup = (group) => {
    setMenuCollapse(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false); // Auto-close sidebar on mobile/tablet
  };

  const getEmbedUrl = (pageId) => {
    return embedUrls[pageId] || DEFAULT_EMBEDS[pageId] || '';
  };

  const isRealEmbedActive = (pageId) => {
    if (pageId === 'master-dmsc' || pageId === 'rlu_dashboard') {
      return showRealEmbed[pageId] !== false;
    }
    return showRealEmbed[pageId] === true;
  };

  const handleOpenConfig = (pageId) => {
    setModalPageId(pageId);
    if (pageId === 'rlu_dashboard') {
      setTempMetabaseBase(metabaseBaseUrl);
      setTempMetabaseUuids(metabaseUuids);
    } else {
      setTempEmbedUrl(getEmbedUrl(pageId));
    }
    setModalOpen(true);
  };

  const handleSaveConfig = () => {
    if (modalPageId === 'rlu_dashboard') {
      localStorage.setItem('lnelab_metabase_base', tempMetabaseBase);
      setMetabaseBaseUrl(tempMetabaseBase);
      localStorage.setItem('lnelab_metabase_uuids', JSON.stringify(tempMetabaseUuids));
      setMetabaseUuids(tempMetabaseUuids);
    } else {
      const updatedUrls = { ...embedUrls, [modalPageId]: tempEmbedUrl };
      setEmbedUrls(updatedUrls);
      localStorage.setItem('lnelab_embed_urls', JSON.stringify(updatedUrls));
    }
    setModalOpen(false);
  };

  const handleToggleMode = (pageId, forceReal) => {
    const updatedModes = { ...showRealEmbed, [pageId]: forceReal };
    setShowRealEmbed(updatedModes);
    localStorage.setItem('lnelab_show_real_embed', JSON.stringify(updatedModes));
  };

  const handleChecklistChange = (device, itemIndex, type = 'daily') => {
    const key = `${device}_${type}`;
    const current = checklistState[key] || [];
    const updated = [...current];
    updated[itemIndex] = !updated[itemIndex];
    
    const newChecklistState = { ...checklistState, [key]: updated };
    setChecklistState(newChecklistState);
    localStorage.setItem('lnelab_checklists', JSON.stringify(newChecklistState));
  };

  const handleAddLog = (device, operator, notes) => {
    if (!operator || !notes) return;
    const currentList = deviceLogs[device] || [];
    const newEntry = {
      date: new Date().toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      operator,
      notes
    };
    const updatedLogs = { ...deviceLogs, [device]: [newEntry, ...currentList] };
    setDeviceLogs(updatedLogs);
    localStorage.setItem('lnelab_device_logs', JSON.stringify(updatedLogs));
  };

  const handleSurveySubmit = (surveyType) => {
    setSurveyNotification(`${t[lang].surveySuccess} (Rating: ${surveyRating}/5)`);
    setTimeout(() => {
      setSurveyNotification('');
      setSurveyComment('');
      setSurveyRating(5);
    }, 3000);
  };

  const renderLineChart = (data, labels, accentColor = 'var(--accent-primary)') => {
    const maxVal = Math.max(...data);
    const height = 150;
    const width = 500;
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * (width - 40) + 20;
      const y = height - (val / maxVal) * (height - 40) - 20;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="chart-svg" viewBox={`0 0 ${width} ${height}`}>
        {[0, 1, 2, 3].map(i => (
          <line
            key={i}
            x1="20"
            y1={(i / 3) * (height - 40) + 20}
            x2={width - 20}
            y2={(i / 3) * (height - 40) + 20}
            className="chart-grid-line"
          />
        ))}
        <polyline points={points} className="chart-line" stroke={accentColor} />
        {data.map((val, idx) => {
          const x = (idx / (data.length - 1)) * (width - 40) + 20;
          const y = height - (val / maxVal) * (height - 40) - 20;
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="4.5"
              fill={accentColor}
              stroke="var(--bg-dark)"
              strokeWidth="1.5"
              style={{ cursor: 'pointer' }}
            />
          );
        })}
        {labels.map((lbl, idx) => {
          const x = (idx / (labels.length - 1)) * (width - 40) + 20;
          return (
            <text
              key={idx}
              x={x}
              y={height - 2}
              fill="var(--text-muted)"
              fontSize="9"
              textAnchor="middle"
            >
              {lbl}
            </text>
          );
        })}
      </svg>
    );
  };

  const renderBarChart = (data, labels) => {
    const maxVal = Math.max(...data);
    const height = 150;
    const width = 500;
    const padding = 30;
    const barWidth = (width - padding * 2) / data.length - 10;

    return (
      <svg className="chart-svg" viewBox={`0 0 ${width} ${height}`}>
        {[0, 1, 2, 3].map(i => (
          <line
            key={i}
            x1="20"
            y1={(i / 3) * (height - 40) + 20}
            x2={width - 20}
            y2={(i / 3) * (height - 40) + 20}
            className="chart-grid-line"
          />
        ))}
        {data.map((val, idx) => {
          const x = padding + idx * (barWidth + 10);
          const barHeight = (val / maxVal) * (height - 40);
          const y = height - barHeight - 20;
          return (
            <g key={idx}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                className="chart-bar"
              />
              <text
                x={x + barWidth / 2}
                y={height - 4}
                fill="var(--text-muted)"
                fontSize="9"
                textAnchor="middle"
              >
                {labels[idx]}
              </text>
              <text
                x={x + barWidth / 2}
                y={y - 4}
                fill="var(--text-main)"
                fontSize="8"
                fontWeight="600"
                textAnchor="middle"
              >
                {val}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <>
      {/* Sidebar Navigation Drawer */}
      <div className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">N</div>
            <div className="logo-text">{t[lang].portalName}</div>
          </div>
          <button className="sidebar-close-btn" onClick={() => setMobileMenuOpen(false)}>×</button>
        </div>
        
        <div className="sidebar-menu">
          {/* Main Home Button */}
          <div 
            className={`menu-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            <span className="menu-item-icon">⚡</span>
            {t[lang].home}
          </div>

          {/* Group: Quality Work */}
          <div className="menu-group">
            <div className="menu-header" onClick={() => toggleGroup('qualityWork')}>
              <span>{t[lang].qualityWork}</span>
              <span className={`menu-header-arrow ${menuCollapse.qualityWork ? 'collapsed' : ''}`}>▼</span>
            </div>
            {!menuCollapse.qualityWork && (
              <div className="menu-items">
                <div 
                  className={`menu-item sub-menu-item ${currentPage.startsWith('satisfy') ? 'active' : ''}`}
                  onClick={() => navigateTo('satisfy-doctor')}
                >
                  📄 {t[lang].satisfaction}
                </div>
                <div 
                  className={`menu-item sub-menu-item ${currentPage.startsWith('master') ? 'active' : ''}`}
                  onClick={() => navigateTo('master-dmsc')}
                >
                  📁 {t[lang].masterList}
                </div>
                <div 
                  className={`menu-item sub-menu-item ${currentPage === 'workload' ? 'active' : ''}`}
                  onClick={() => navigateTo('workload')}
                >
                  📊 {t[lang].workLoad}
                </div>
                <div 
                  className={`menu-item sub-menu-item ${currentPage === 'comparison' ? 'active' : ''}`}
                  onClick={() => navigateTo('comparison')}
                >
                  🧪 {t[lang].comparison}
                </div>
                <div 
                  className={`menu-item sub-menu-item ${currentPage === 'consult' ? 'active' : ''}`}
                  onClick={() => navigateTo('consult')}
                >
                  💬 {t[lang].consultation}
                </div>
                <div 
                  className={`menu-item sub-menu-item ${currentPage === 'risk' ? 'active' : ''}`}
                  onClick={() => navigateTo('risk')}
                >
                  ⚠️ {t[lang].risk}
                </div>
                <div 
                  className={`menu-item sub-menu-item ${currentPage === 'tat' ? 'active' : ''}`}
                  onClick={() => navigateTo('tat')}
                >
                  ⏱️ {t[lang].tat}
                </div>
              </div>
            )}
          </div>

          {/* Group: RLU Metabase */}
          <div 
            className={`menu-item ${currentPage === 'rlu' ? 'active' : ''}`}
            onClick={() => navigateTo('rlu')}
          >
            <span className="menu-item-icon">📈</span>
            {t[lang].rluMetabase}
          </div>

          {/* Group: Quality Control */}
          <div className="menu-group">
            <div className="menu-header" onClick={() => toggleGroup('qualityControl')}>
              <span>{t[lang].qualityControl}</span>
              <span className={`menu-header-arrow ${menuCollapse.qualityControl ? 'collapsed' : ''}`}>▼</span>
            </div>
            {!menuCollapse.qualityControl && (
              <div className="menu-items">
                <div 
                  className={`menu-item sub-menu-item ${currentPage === 'lab-performance' ? 'active' : ''}`}
                  onClick={() => navigateTo('lab-performance')}
                >
                  🏅 {t[lang].labPerf}
                </div>
                <div 
                  className={`menu-item sub-menu-item ${currentPage === 'eqa-perform' ? 'active' : ''}`}
                  onClick={() => navigateTo('eqa-perform')}
                >
                  🌍 {t[lang].eqa}
                </div>
                <div 
                  className={`menu-item sub-menu-item ${currentPage === 'iqc-perform' ? 'active' : ''}`}
                  onClick={() => navigateTo('iqc-perform')}
                >
                  🎯 {t[lang].iqc}
                </div>
                <div 
                  className={`menu-item sub-menu-item ${currentPage === 'eqa-corrective' ? 'active' : ''}`}
                  onClick={() => navigateTo('eqa-corrective')}
                >
                  🔧 {t[lang].eqaCorrective}
                </div>
              </div>
            )}
          </div>

          {/* Group: Maintenance */}
          <div className="menu-group">
            <div className="menu-header" onClick={() => toggleGroup('maintenance')}>
              <span>{t[lang].maintenance}</span>
              <span className={`menu-header-arrow ${menuCollapse.maintenance ? 'collapsed' : ''}`}>▼</span>
            </div>
            {!menuCollapse.maintenance && (
              <div className="menu-items">
                {['autolumo', 'ca-620', 'vitross-4600', 'bc-6200', 'fus1000'].map(device => (
                  <div 
                    key={device}
                    className={`menu-item sub-menu-item ${currentPage === `m-${device}` ? 'active' : ''}`}
                    onClick={() => navigateTo(`m-${device}`)}
                  >
                    ⚙️ {device.toUpperCase()}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="main-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="menu-toggle-btn" onClick={() => setMobileMenuOpen(true)}>☰</button>
            <div className="header-title-section">
              <h1 className="header-title">
                {currentPage === 'home' && t[lang].home}
                {currentPage.startsWith('satisfy') && t[lang].satisfaction}
                {currentPage.startsWith('master') && t[lang].masterList}
                {currentPage === 'workload' && t[lang].workLoad}
                {currentPage === 'comparison' && t[lang].comparison}
                {currentPage === 'consult' && t[lang].consultation}
                {currentPage === 'risk' && t[lang].risk}
                {currentPage === 'tat' && t[lang].tat}
                {currentPage === 'rlu' && t[lang].rluMetabase}
                {currentPage === 'lab-performance' && t[lang].labPerf}
                {currentPage === 'eqa-perform' && t[lang].eqa}
                {currentPage === 'iqc-perform' && t[lang].iqc}
                {currentPage === 'eqa-corrective' && t[lang].eqaCorrective}
                {currentPage.startsWith('m-') && `${t[lang].maintenance} - ${currentPage.replace('m-', '').toUpperCase()}`}
              </h1>
              <span className="header-subtitle">{t[lang].hospitalSub}</span>
            </div>
          </div>

          <div className="header-controls">
            <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme" style={{ cursor: 'pointer' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button className="lang-btn" onClick={toggleLang}>
              <span className="lang-indicator"></span>
              {t[lang].langToggle}
            </button>
            <div className="user-profile">
              <div className="user-avatar">L</div>
              <span className="user-name">Lab Tech</span>
            </div>
          </div>
        </div>

        <div className="content-body">
          
          {/* ================= HOME PAGE ================= */}
          {currentPage === 'home' && (
            <div>
              <div className="grid-cols-4">
                <div className="glass-card">
                  <div className="card-title">IQC STATS <span className="badge badge-success">Active</span></div>
                  <div className="card-value">98.4%</div>
                  <div className="card-subtitle">Within acceptable Standard Deviation (SD)</div>
                </div>
                <div className="glass-card">
                  <div className="card-title">EQA PERFORMANCE <span className="badge badge-primary">Pass</span></div>
                  <div className="card-value">100%</div>
                  <div className="card-subtitle">All EQA cycles submitted & passed</div>
                </div>
                <div className="glass-card">
                  <div className="card-title">TAT COMPLIANCE <span className="badge badge-success">On-Time</span></div>
                  <div className="card-value">97.2%</div>
                  <div className="card-subtitle">Turnaround time compliance rating</div>
                </div>
                <div className="glass-card">
                  <div className="card-title">DEVICES ONLINE <span className="badge badge-primary">5/5</span></div>
                  <div className="card-value">100%</div>
                  <div className="card-subtitle">All lab equipment fully operational</div>
                </div>
              </div>

              <div className="grid-cols-2">
                <div className="glass-card">
                  <h3>Laboratory Turn Around Time (TAT) Trend</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.8rem' }}>Weekly compliance percentage</p>
                  {renderLineChart([94, 96, 95, 98, 97, 99, 97.2], ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'])}
                </div>
                <div className="glass-card">
                  <h3>Laboratory Workload Distribution</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.8rem' }}>Monthly sample count (in hundreds)</p>
                  {renderBarChart([42, 51, 48, 62, 55, 59], ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'])}
                </div>
              </div>

              <div className="glass-card" style={{ marginTop: '20px' }}>
                <h3>Na Dee Hospital Medical Technology Division</h3>
                <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>
                  ยินดีต้อนรับสู่พอร์ทัลจัดการระบบควบคุมคุณภาพและซ่อมบำรุงเครื่องมือแพทย์ กลุ่มงานเทคนิคการแพทย์ โรงพยาบาลนาดี 
                  พอร์ทัลนี้ได้รับการออกแบบใหม่เพื่อการติดตามตรวจสอบควบคุมคุณภาพทั้งภายใน (IQC) และภายนอก (EQA) 
                  อย่างมีประสิทธิภาพ รวมถึงบันทึกและระบบเช็คลิสต์ตรวจเช็คเครื่องมือวิเคราะห์อัตโนมัติรายวัน/รายสัปดาห์
                </p>
                <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '15px', display: 'flex', gap: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>{t[lang].lastUpdated}</span>
                  <span>|</span>
                  <span>Version 2.0 (SPA Redesign)</span>
                </div>
              </div>
            </div>
          )}

          {/* ================= SATISFACTION SURVEYS ================= */}
          {currentPage.startsWith('satisfy') && (
            <div className="glass-card">
              <div className="tabs-container">
                <div className={`tab ${currentPage === 'satisfy-doctor' ? 'active' : ''}`} onClick={() => setCurrentPage('satisfy-doctor')}>{t[lang].doctorSatisfy}</div>
                <div className={`tab ${currentPage === 'satisfy-nurse' ? 'active' : ''}`} onClick={() => setCurrentPage('satisfy-nurse')}>{t[lang].nurseSatisfy}</div>
                <div className={`tab ${currentPage === 'satisfy-staff' ? 'active' : ''}`} onClick={() => setCurrentPage('satisfy-staff')}>{t[lang].staffSatisfy}</div>
                <div className={`tab ${currentPage === 'satisfy-patient' ? 'active' : ''}`} onClick={() => setCurrentPage('satisfy-patient')}>{t[lang].patientSatisfy}</div>
                <div className={`tab ${currentPage === 'satisfy-hstaff' ? 'active' : ''}`} onClick={() => setCurrentPage('satisfy-hstaff')}>{t[lang].hospitalStaffSatisfy}</div>
              </div>

              <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px 0' }}>
                <h3 style={{ marginBottom: '16px' }}>
                  {currentPage === 'satisfy-doctor' && t[lang].doctorSatisfy}
                  {currentPage === 'satisfy-nurse' && t[lang].nurseSatisfy}
                  {currentPage === 'satisfy-staff' && t[lang].staffSatisfy}
                  {currentPage === 'satisfy-patient' && t[lang].patientSatisfy}
                  {currentPage === 'satisfy-hstaff' && t[lang].hospitalStaffSatisfy}
                </h3>
                
                {surveyNotification && (
                  <div className="badge badge-success" style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', fontSize: '0.9rem' }}>
                    ✔ {surveyNotification}
                  </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                  <p style={{ marginBottom: '12px', fontWeight: '500' }}>{t[lang].ratingQuestion}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setSurveyRating(rating)}
                        style={{
                          flex: 1,
                          height: '45px',
                          background: surveyRating === rating ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.02)',
                          color: surveyRating === rating ? 'var(--bg-dark)' : 'var(--text-main)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>น้อยที่สุด (Least)</span>
                    <span>มากที่สุด (Most)</span>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <textarea
                    className="form-input"
                    rows="4"
                    placeholder={t[lang].feedbackPlaceholder}
                    value={surveyComment}
                    onChange={(e) => setSurveyComment(e.target.value)}
                    style={{ resize: 'none' }}
                  />
                </div>

                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => handleSurveySubmit(currentPage)}>
                  {t[lang].submitSurvey}
                </button>
              </div>
            </div>
          )}

          {/* ================= DOCUMENT MASTER LIST ================= */}
          {currentPage.startsWith('master') && (
            <div className="glass-card">
              <div className="tabs-container">
                <div className={`tab ${currentPage === 'master-dmsc' ? 'active' : ''}`} onClick={() => setCurrentPage('master-dmsc')}>DMSC Auth</div>
                <div className={`tab ${currentPage === 'master-manual' ? 'active' : ''}`} onClick={() => setCurrentPage('master-manual')}>Quality Manual</div>
                <div className={`tab ${currentPage === 'master-procedure' ? 'active' : ''}`} onClick={() => setCurrentPage('master-procedure')}>Work Procedure</div>
                <div className={`tab ${currentPage === 'master-instruction' ? 'active' : ''}`} onClick={() => setCurrentPage('master-instruction')}>Work Instruction</div>
                <div className={`tab ${currentPage === 'master-form' ? 'active' : ''}`} onClick={() => setCurrentPage('master-form')}>Form</div>
                <div className={`tab ${currentPage === 'master-supportive' ? 'active' : ''}`} onClick={() => setCurrentPage('master-supportive')}>Supportive Document</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ textTransform: 'uppercase' }}>
                  Document Viewer: {currentPage.replace('master-', '').replace('-', ' ')}
                </h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className={`btn btn-secondary ${!isRealEmbedActive(currentPage) ? 'active' : ''}`}
                    onClick={() => handleToggleMode(currentPage, false)}
                    style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                  >
                    {t[lang].mockDashboard}
                  </button>
                  <button 
                    className={`btn btn-secondary ${isRealEmbedActive(currentPage) ? 'active' : ''}`}
                    onClick={() => handleToggleMode(currentPage, true)}
                    style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                  >
                    {t[lang].activeEmbed}
                  </button>
                  <button className="card-config-btn" onClick={() => handleOpenConfig(currentPage)}>⚙</button>
                </div>
              </div>

              {currentPage === 'master-dmsc' && (
                <div className="badge badge-warning" style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', textAlign: 'center' }}>
                  <span>🔒 หากหน้าต่างระบบลงชื่อเข้าใช้งานของกรมวิทยาศาสตร์การแพทย์ (DMSC) ไม่แสดงในกรอบด้านล่าง (เนื่องจากมาตรการความปลอดภัย X-Frame-Options) ท่านสามารถคลิกเพื่อเปิดระบบแยกได้โดยตรง</span>
                  <a href={getEmbedUrl('master-dmsc')} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                    เปิดลิงก์ในแท็บใหม่ (Open DMSC Portal) ↗
                  </a>
                </div>
              )}

              {isRealEmbedActive(currentPage) ? (
                <div className="embed-container">
                  {getEmbedUrl(currentPage) ? (
                    <iframe 
                      className="embed-iframe"
                      src={getEmbedUrl(currentPage)} 
                      title="Google Doc Embed"
                    />
                  ) : (
                    <div className="embed-placeholder">
                      <div className="embed-placeholder-icon">📭</div>
                      <div className="embed-placeholder-title">{t[lang].noEmbedUrl}</div>
                      <button className="btn btn-primary" onClick={() => handleOpenConfig(currentPage)}>
                        Configure Embed Link
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px dashed var(--border-color)', borderRadius: '12px', padding: '60px 40px', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📂</div>
                  <h3>Quality Manual & Standards Documentation</h3>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '12px auto' }}>
                    นี่เป็นเวอร์ชันจำลองของห้องสมุดคุณภาพ (Master Document List) คุณสามารถเปิดใช้งาน "แสดงการฝังจริง" 
                    ด้านบน เพื่อฝัง Google Docs ของกลุ่มงานเทคนิคการแพทย์ของคุณได้โดยตรง
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
                    <a className="btn btn-secondary" href="#read">Read Guideline (PDF)</a>
                    <button className="btn btn-primary" onClick={() => handleToggleMode(currentPage, true)}>Switch to Iframe Embed</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= WORK LOAD ================= */}
          {currentPage === 'workload' && (
            <div className="glass-card">
              <h3>Monthly Laboratory Workload</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                สถิติปริมาณงานกลุ่มงานเทคนิคการแพทย์ จำแนกตามแผนกวิเคราะห์ (ครั้ง/เดือน)
              </p>
              
              <div className="grid-cols-2" style={{ marginBottom: '20px' }}>
                <div>
                  {renderBarChart([1250, 940, 1850, 310, 420], ['Chemistry', 'Hematology', 'Microscopic', 'Immunology', 'Bloodbank'])}
                </div>
                <div style={{ padding: '20px' }}>
                  <h4 style={{ marginBottom: '12px' }}>สรุปสถิตินำส่งตรวจวิเคราะห์</h4>
                  <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
                    <li>🔬 <strong>เคมีคลินิก (Chemistry):</strong> 1,250 รายการ / เดือน (ปกติ)</li>
                    <li>🩸 <strong>โลหิตวิทยา (Hematology):</strong> 940 รายการ / เดือน</li>
                    <li>🔬 <strong>จุลทรรศนศาสตร์ (Microscopic):</strong> 1,850 รายการ (สถิติสูงสุดจากการตรวจปัสสาวะ)</li>
                    <li>💉 <strong>ภูมิคุ้มกันวิทยา (Immunology):</strong> 310 รายการ</li>
                    <li>🏥 <strong>ธนาคารเลือด (Bloodbank):</strong> 420 รายการ</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ================= COMPARISON TEST ================= */}
          {currentPage === 'comparison' && (
            <div className="glass-card">
              <h3>Comparison Test / Analyzer Equivalence</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                บันทึกการเปรียบเทียบผลการวิเคราะห์ระหว่างเครื่องมือวิเคราะห์หลักและสำรองเพื่อทดสอบความเท่าเทียม (Equivalence Check)
              </p>
              <div className="maintenance-table-container">
                <table className="m-table">
                  <thead>
                    <tr>
                      <th>เครื่องวิเคราะห์หลัก</th>
                      <th>เครื่องวิเคราะห์สำรอง</th>
                      <th>สารคุมชีพจร (Parameter)</th>
                      <th>ความแตกต่างเฉลี่ย (Mean Diff)</th>
                      <th>สถานะเปรียบเทียบ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Vitross 4600</td>
                      <td>AutoLumo</td>
                      <td>Glucose</td>
                      <td>+1.8%</td>
                      <td><span className="badge badge-success">ผ่านการทดสอบ</span></td>
                    </tr>
                    <tr>
                      <td>BC 6200</td>
                      <td>Sysmex (Backup)</td>
                      <td>Hemoglobin</td>
                      <td>-0.5%</td>
                      <td><span className="badge badge-success">ผ่านการทดสอบ</span></td>
                    </tr>
                    <tr>
                      <td>Vitross 4600</td>
                      <td>AutoLumo</td>
                      <td>Creatinine</td>
                      <td>+3.2%</td>
                      <td><span className="badge badge-success">ผ่านการทดสอบ</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= CONSULTATION LOG ================= */}
          {currentPage === 'consult' && (
            <div className="glass-card">
              <h3>บันทึกการให้คำปรึกษาทางห้องปฏิบัติการ</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                บันทึกคำถาม คำแนะนำ และการตอบปรึกษาระหว่างห้องแล็บร่วมกับแพทย์ พยาบาล และสหสาขาวิชาชีพ
              </p>
              <div className="maintenance-table-container">
                <table className="m-table">
                  <thead>
                    <tr>
                      <th>{t[lang].date}</th>
                      <th>ผู้ติดต่อ / แผนก</th>
                      <th>ข้อปรึกษา</th>
                      <th>คำแนะนำจากห้องแล็บ</th>
                      <th>ผู้ตอบปรึกษา</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>11/07/2026</td>
                      <td>พญ. วรัญญา (ER)</td>
                      <td>สอบถามเกณฑ์ระดับวิกฤตของผล Troponin T</td>
                      <td>ระดับ Troponin T วิกฤตคือ &gt; 14 ng/L โทรแจ้งทันทีใน 15 นาที</td>
                      <td>ทนพ. สมชาย</td>
                    </tr>
                    <tr>
                      <td>10/07/2026</td>
                      <td>พยาบาล อรอนงค์ (OPD)</td>
                      <td>พบปัญหาหลอดตรวจวิเคราะห์ตกตะกอนช้า</td>
                      <td>แนะนำให้ตั้งหลอดตรง 30 นาทีก่อนนำเข้าเครื่องเหวี่ยงวิเคราะห์</td>
                      <td>ทนพญ. รัตนา</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= RISK LOGS ================= */}
          {currentPage === 'risk' && (
            <div className="glass-card">
              <h3>Laboratory Risk Log & Safety Reports</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                บันทึกความเสี่ยง เหตุการณ์ไม่พึงประสงค์ (Non-Conformities) และการปรับปรุงแก้ไขเพื่อความปลอดภัยในแล็บ
              </p>
              <div className="maintenance-table-container">
                <table className="m-table">
                  <thead>
                    <tr>
                      <th>ระดับความเสี่ยง</th>
                      <th>เหตุการณ์ความเสี่ยง</th>
                      <th>มาตรการแก้ไขเบื้องต้น</th>
                      <th>การป้องกันการเกิดซ้ำ</th>
                      <th>{t[lang].status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="badge badge-warning">ปานกลาง</span></td>
                      <td>ฉลากระบุชื่อผู้ป่วยบนหลอดสิ่งส่งตรวจเลอะเลือน</td>
                      <td>ประสานพยาบาลเจ้าของไข้เพื่อตรวจสอบเอกลักษณ์บุคคลใหม่</td>
                      <td>ให้ใช้ระบบบาร์โค้ดสติกเกอร์พิมพ์ตรงแทนการเขียนด้วยปากกา</td>
                      <td><span className="badge badge-success">Closed</span></td>
                    </tr>
                    <tr>
                      <td><span className="badge badge-danger">สูง</span></td>
                      <td>ไฟตกทำให้อุณหภูมิตู้เก็บน้ำยาชันสูตรเบี่ยงเบนชั่วคราว</td>
                      <td>ย้ายน้ำยาไปยังตู้เก็บสำรองทันที ตรวจเช็คสอบเทียบเครื่องเก็บความเย็น</td>
                      <td>ปรับปรุงระบบตู้จ่ายไฟสำรอง (UPS) ประจำตู้แช่เย็น</td>
                      <td><span className="badge badge-primary">Monitoring</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= TURN AROUND TIME ================= */}
          {currentPage === 'tat' && (
            <div className="glass-card">
              <h3>Turn Around Time (TAT) Analytics</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                การตรวจสอบวิเคราะห์ระยะเวลาในการรายงานผลการวิเคราะห์ทางห้องปฏิบัติการ
              </p>
              <div className="grid-cols-3">
                <div className="glass-card" style={{ background: 'rgba(255,255,255,0.01)' }}>
                  <div className="card-title">CBC (Hematology)</div>
                  <div className="card-value">22 Mins</div>
                  <div className="card-subtitle">Target: &lt; 30 Mins (98.2% Pass)</div>
                </div>
                <div className="glass-card" style={{ background: 'rgba(255,255,255,0.01)' }}>
                  <div className="card-title">Electrolyte (Chemistry)</div>
                  <div className="card-value">41 Mins</div>
                  <div className="card-subtitle">Target: &lt; 45 Mins (96.5% Pass)</div>
                </div>
                <div className="glass-card" style={{ background: 'rgba(255,255,255,0.01)' }}>
                  <div className="card-title">Urine Analysis</div>
                  <div className="card-value">18 Mins</div>
                  <div className="card-subtitle">Target: &lt; 20 Mins (99.0% Pass)</div>
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                {renderLineChart([92, 94, 96, 95, 98, 97.2], ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'])}
              </div>
            </div>
          )}

          {/* ================= RLU METABASE ================= */}
          {currentPage === 'rlu' && (
            <div className="glass-card">
              {/* Metabase Tutorial Top Bar */}
              <div className="badge badge-primary" style={{ width: '100%', padding: '16px', marginBottom: '20px', borderRadius: '10px', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📖</span>
                  <strong style={{ fontWeight: '600' }}>คู่มือแนะนำการใช้งาน Metabase (Tutorial: How to use Metabase)</strong>
                </div>
                <a 
                  href="https://drive.google.com/drive/folders/1GfZfZulr3CF00Mb-bBJy_Hjus8JyTXn1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary" 
                  style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '6px 14px', fontSize: '0.8rem', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}
                >
                  เปิดโฟลเดอร์คู่มือ (Open Drive Link) ↗
                </a>
              </div>

              <div className="metabase-layout" style={{ display: 'flex', gap: '20px', minHeight: '500px', flexWrap: 'wrap' }}>
                {/* Left Mini Sidebar */}
                <div className="metabase-sidebar" style={{ width: '220px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>
                    Main Dashboards
                  </div>
                  <button 
                    className={`btn ${selectedMetabaseTab === 'overall' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedMetabaseTab('overall')}
                    style={{ textAlign: 'left', width: '100%', padding: '10px 14px' }}
                  >
                    📊 Overall KPI Dashboard
                  </button>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold', marginTop: '10px' }}>
                    Lab Metrics
                  </div>
                  <button 
                    className={`btn ${selectedMetabaseTab === 'hba1c' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedMetabaseTab('hba1c')}
                    style={{ textAlign: 'left', width: '100%', padding: '10px 14px' }}
                  >
                    🧪 HbA1c Analysis
                  </button>
                  <button 
                    className={`btn ${selectedMetabaseTab === 'ldl' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedMetabaseTab('ldl')}
                    style={{ textAlign: 'left', width: '100%', padding: '10px 14px' }}
                  >
                    🩸 LDL Monitoring
                  </button>
                </div>

                {/* Right Viewer Content */}
                <div className="metabase-content" style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Controls Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <h4 style={{ margin: 0, textTransform: 'uppercase' }}>
                      {selectedMetabaseTab === 'overall' && '📊 Overall KPI Dashboard'}
                      {selectedMetabaseTab === 'hba1c' && '🧪 HbA1c Analysis'}
                      {selectedMetabaseTab === 'ldl' && '🩸 LDL Monitoring'}
                    </h4>
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button 
                        className={`btn btn-secondary ${!isRealEmbedActive('rlu_dashboard') ? 'active' : ''}`}
                        onClick={() => handleToggleMode('rlu_dashboard', false)}
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      >
                        {t[lang].mockDashboard}
                      </button>
                      <button 
                        className={`btn btn-secondary ${isRealEmbedActive('rlu_dashboard') ? 'active' : ''}`}
                        onClick={() => handleToggleMode('rlu_dashboard', true)}
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      >
                        {t[lang].activeEmbed}
                      </button>
                      <button className="card-config-btn" onClick={() => handleOpenConfig('rlu_dashboard')}>⚙</button>
                    </div>
                  </div>

                  {/* Viewer Box */}
                  {isRealEmbedActive('rlu_dashboard') ? (
                    <div className="embed-container" style={{ position: 'relative' }}>
                      <a 
                        href={`${metabaseBaseUrl}${metabaseUuids[selectedMetabaseTab]}`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-secondary" 
                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)', color: 'var(--text-main)', border: '1px solid var(--border-color)', padding: '5px 12px', fontSize: '0.75rem', zIndex: 10, textDecoration: 'none', fontWeight: 'bold' }}
                      >
                        Open in Metabase ↗
                      </a>
                      
                      {metabaseUuids[selectedMetabaseTab].includes('-uuid') ? (
                        <div className="embed-placeholder">
                          <div className="embed-placeholder-icon">⚙</div>
                          <div className="embed-placeholder-title">Placeholder UUID Active</div>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                            นี่คือลิงก์ตัวอย่างสำหรับ {selectedMetabaseTab.toUpperCase()} คลิกปุ่มรูปฟันเฟือง (⚙) เพื่อใส่รหัส UUID จริงของ Metabase
                          </p>
                          <button className="btn btn-primary" onClick={() => handleOpenConfig('rlu_dashboard')}>
                            Configure Metabase UUIDs
                          </button>
                        </div>
                      ) : (
                        <iframe 
                          className="embed-iframe"
                          src={`${metabaseBaseUrl}${metabaseUuids[selectedMetabaseTab]}`}
                          title="Metabase Dashboard"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="glass-card" style={{ background: 'rgba(255,255,255,0.01)', padding: '24px' }}>
                      {selectedMetabaseTab === 'overall' && (
                        <div>
                          <div className="grid-cols-3" style={{ marginBottom: '20px' }}>
                            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.01)' }}>
                              <div className="card-title">RLU METRIC A</div>
                              <div className="card-value">12.85</div>
                              <div className="card-subtitle">Normal threshold range: 10 - 15</div>
                            </div>
                            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.01)' }}>
                              <div className="card-title">RLU METRIC B</div>
                              <div className="card-value">84.20</div>
                              <div className="card-subtitle">Normal threshold range: 80 - 100</div>
                            </div>
                            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.01)' }}>
                              <div className="card-title">RLU METRIC C</div>
                              <div className="card-value">1.02</div>
                              <div className="card-subtitle">Normal threshold range: 0.9 - 1.2</div>
                            </div>
                          </div>
                          {renderLineChart([12.2, 12.5, 13.1, 12.8, 12.4, 12.85], ['Run1', 'Run2', 'Run3', 'Run4', 'Run5', 'Run6'])}
                        </div>
                      )}

                      {selectedMetabaseTab === 'hba1c' && (
                        <div>
                          <h4 style={{ marginBottom: '12px' }}>HbA1c Lab QC Performance Trend</h4>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '16px' }}>Target: &lt; 5.7% (Healthy control levels)</p>
                          {renderLineChart([5.4, 5.5, 5.3, 5.6, 5.5, 5.4], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], 'var(--accent-success)')}
                        </div>
                      )}

                      {selectedMetabaseTab === 'ldl' && (
                        <div>
                          <h4 style={{ marginBottom: '12px' }}>LDL Monitoring Calibration Stats</h4>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '16px' }}>Normal range: 80 - 100 mg/dL</p>
                          {renderBarChart([92, 96, 94, 98, 91, 95], ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4', 'Batch 5', 'Batch 6'])}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= LAB PERFORMANCE ================= */}
          {currentPage === 'lab-performance' && (
            <div className="glass-card">
              <h3>Laboratory Department KPIs & Performance</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                ดัชนีชี้วัดประสิทธิภาพและคุณภาพแยกตามแผนกงานจุลทรรศนศาสตร์, POCT, เคมีคลินิก, โลหิตวิทยา และเซรุ่มวิทยา
              </p>
              <div className="grid-cols-2">
                <div className="glass-card">
                  <h4>Chemistry Department Performance</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '12px' }}>SIGMA Score Metric</p>
                  {renderBarChart([5.8, 6.1, 5.9, 6.2, 6.4], ['Glucose', 'BUN', 'Creatinine', 'UA', 'Cholesterol'])}
                </div>
                <div className="glass-card">
                  <h4>Hematology (CBC) Performance</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '12px' }}>Coefficient of Variation (CV% / Cumulative)</p>
                  {renderLineChart([1.8, 1.9, 1.5, 1.4, 1.2], ['Feb', 'Mar', 'Apr', 'May', 'Jun'])}
                </div>
              </div>
            </div>
          )}

          {/* ================= EQA PROGRAMS ================= */}
          {currentPage === 'eqa-perform' && (
            <div className="glass-card">
              <h3>External Quality Assessment (EQA) Program Status</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                ผลประเมินความสอดคล้องการส่งตรวจควบคุมคุณภาพภายนอกจากองค์กรผู้ประเมินอิสระ
              </p>
              <div className="maintenance-table-container">
                <table className="m-table">
                  <thead>
                    <tr>
                      <th>EQA Program</th>
                      <th>Cycle Code</th>
                      <th>ผลลัพธ์การประเมิน (Score)</th>
                      <th>สถานะ</th>
                      <th>รอบส่งถัดไป</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>EQA Chemistry (Clinical Chemistry)</td>
                      <td>EQA-CHEM-2026-C2</td>
                      <td>100.0% Acceptable</td>
                      <td><span className="badge badge-success">ผ่านการประเมิน</span></td>
                      <td>30/08/2026</td>
                    </tr>
                    <tr>
                      <td>EQA Hematology (CBC Quality)</td>
                      <td>EQA-HEM-2026-C2</td>
                      <td>98.5% Acceptable</td>
                      <td><span className="badge badge-success">ผ่านการประเมิน</span></td>
                      <td>15/09/2026</td>
                    </tr>
                    <tr>
                      <td>EQA Immunology (Serology Tests)</td>
                      <td>EQA-SER-2026-C1</td>
                      <td>100.0% Acceptable</td>
                      <td><span className="badge badge-success">ผ่านการประเมิน</span></td>
                      <td>12/10/2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= IQC STATISTICS ================= */}
          {currentPage === 'iqc-perform' && (
            <div className="glass-card">
              <h3>Internal Quality Control (IQC) Levey-Jennings Trends</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                ระบบเฝ้าระวังควบคุมคุณภาพภายในห้องปฏิบัติการเพื่อตรวจจับข้อผิดพลาดเชิงระบบแบบ Real-time
              </p>
              <div className="grid-cols-2">
                <div className="glass-card" style={{ background: 'rgba(255,255,255,0.01)' }}>
                  <h4>L-J Chart: Level 1 Control (Normal)</h4>
                  {renderLineChart([101, 102, 99, 100.5, 98.4, 101.2, 100], ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'])}
                </div>
                <div className="glass-card" style={{ background: 'rgba(255,255,255,0.01)' }}>
                  <h4>L-J Chart: Level 2 Control (Pathological)</h4>
                  {renderLineChart([245, 248, 252, 247.5, 241, 246], ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'])}
                </div>
              </div>
            </div>
          )}

          {/* ================= EQA CORRECTIVE ACTIONS ================= */}
          {currentPage === 'eqa-corrective' && (
            <div className="glass-card">
              <h3>บันทึกการแก้ไขปัญหาเมื่อ EQA ออกนอกเกณฑ์ (EQA Corrective Actions)</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                บันทึกการทบทวนหาสาเหตุ แก้ไข และป้องกันปัญหาในกรณีส่งประเมินควบคุมคุณภาพภายนอกพบจุดเบี่ยงเบน
              </p>
              <div className="maintenance-table-container">
                <table className="m-table">
                  <thead>
                    <tr>
                      <th>วันที่ตรวจสอบ</th>
                      <th>รายการ EQA เบี่ยงเบน</th>
                      <th>วิเคราะห์สาเหตุ (Root Cause)</th>
                      <th>การแก้ไข (Corrective Action)</th>
                      <th>ทบทวนโดย</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>04/07/2026</td>
                      <td>Urea Nitrogen (BUN) Cycle 1</td>
                      <td>การเสื่อมของสารรีเอเจนต์ขวดสำรองเนื่องจากตู้เก็บไฟดับชั่วครู่</td>
                      <td>เปลี่ยนขวดรีเอเจนต์ใหม่ยกเซ็ต ทำการสอบเทียบใหม่และตรวจเช็คซ้ำ</td>
                      <td>ทนพ. สมชาย</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= INSTRUMENT MAINTENANCE PAGES ================= */}
          {currentPage.startsWith('m-') && (
            <div>
              {/* Checklists and logs for devices */}
              {(() => {
                const device = currentPage.replace('m-', '');
                const dailyKey = `${device}_daily`;
                const weeklyKey = `${device}_weekly`;
                
                // Mocks lists
                const dailyItems = [
                  'ตรวจเช็คระดับน้ำยากลุ่มน้ำยาวิเคราะห์และบัฟเฟอร์ (Check reagent levels)',
                  'ทำความสะอาดเข็มดูดตัวอย่างและล้างระบบหัวตรวจ (Clean sample probe and wash system)',
                  'ตรวจเช็คและรันสารคุมชีพจรควบคุมคุณภาพ IQC (Run IQC controls & review stats)',
                  'บันทึกสถิติและค่าอุณหภูมิห้องควบคุมอุณหภูมิวิเคราะห์ (Record incubator/analyzer temp)',
                  'เคลียร์ขยะถาดใส่น้ำยาและของเสียติดเชื้อ (Empty analyzer waste container)'
                ];
                
                const weeklyItems = [
                  'ทำความสะอาดล้างระบบท่อส่งภายในอย่างละเอียด (Deep clean internal tubing)',
                  'รันสอบเทียบพื้นหลังเครื่องวัดปริมาณสารเคมี (Run backgrounds & dark current calibration)',
                  'ตรวจสอบและล้างทำความสะอาดถาดปฏิกิริยาเคมีวิเคราะห์ (Wash reaction cuvettes)'
                ];

                const currentDaily = checklistState[dailyKey] || new Array(dailyItems.length).fill(false);
                const currentWeekly = checklistState[weeklyKey] || new Array(weeklyItems.length).fill(false);
                
                // Calculate device status
                const dailyCheckedCount = currentDaily.filter(Boolean).length;
                const dailyPercent = Math.round((dailyCheckedCount / dailyItems.length) * 100);
                const statusColor = dailyPercent === 100 ? 'var(--accent-success)' : dailyPercent > 0 ? 'var(--accent-warning)' : 'var(--text-muted)';
                const statusLabel = dailyPercent === 100 ? t[lang].ready : t[lang].needsMaintenance;

                const handleLocalAddLog = (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const operator = form.elements.operator.value;
                  const notes = form.elements.notes.value;
                  handleAddLog(device, operator, notes);
                  form.reset();
                };

                return (
                  <div className="grid-cols-2">
                    <div>
                      <div className="glass-card" style={{ marginBottom: '20px' }}>
                        <div className="card-title">
                          {t[lang].deviceStatus}
                          <span className="badge" style={{ background: `rgba(255,255,255,0.02)`, color: statusColor, border: `1px solid ${statusColor}` }}>
                            {statusLabel} ({dailyPercent}%)
                          </span>
                        </div>
                        
                        <h4 style={{ marginBottom: '14px', display: 'flex', justifycontent: 'space-between', alignitems: 'center' }}>
                          <span>{t[lang].dailyChecklist}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{dailyCheckedCount}/{dailyItems.length} checked</span>
                        </h4>
                        
                        <div className="checklist-container">
                          {dailyItems.map((item, idx) => (
                            <div 
                              key={idx}
                              className={`checklist-item ${currentDaily[idx] ? 'checked' : ''}`}
                              onClick={() => handleChecklistChange(device, idx, 'daily')}
                            >
                              <div className="checkbox-custom">
                                {currentDaily[idx] && '✔'}
                              </div>
                              <span className="checklist-text">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="glass-card">
                        <h4 style={{ marginBottom: '14px' }}>{t[lang].weeklyChecklist}</h4>
                        <div className="checklist-container">
                          {weeklyItems.map((item, idx) => (
                            <div 
                              key={idx}
                              className={`checklist-item ${currentWeekly[idx] ? 'checked' : ''}`}
                              onClick={() => handleChecklistChange(device, idx, 'weekly')}
                            >
                              <div className="checkbox-custom">
                                {currentWeekly[idx] && '✔'}
                              </div>
                              <span className="checklist-text">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* Logging Forms */}
                      <div className="glass-card" style={{ marginBottom: '20px' }}>
                        <h4>{t[lang].addEntry}</h4>
                        <form onSubmit={handleLocalAddLog} style={{ marginTop: '16px' }}>
                          <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                              {t[lang].operator}
                            </label>
                            <input type="text" name="operator" className="form-input" required placeholder="เช่น ทนพ. สมชาย" />
                          </div>
                          <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                              {t[lang].notes}
                            </label>
                            <textarea name="notes" rows="4" className="form-input" required placeholder="ระบุอาการชำรุด หรือ รายละเอียดการบำรุงรักษาตัวเครื่อง..." style={{ resize: 'none' }}></textarea>
                          </div>
                          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            {t[lang].save}
                          </button>
                        </form>
                      </div>

                      {/* Log History */}
                      <div className="glass-card">
                        <h4>ประวัติการตรวจเช็คและการซ่อมบำรุง (History Logs)</h4>
                        <div className="maintenance-table-container">
                          <table className="m-table">
                            <thead>
                              <tr>
                                <th style={{ width: '120px' }}>{t[lang].date}</th>
                                <th style={{ width: '100px' }}>{t[lang].operator}</th>
                                <th>{t[lang].notes}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(deviceLogs[device] || []).length > 0 ? (
                                (deviceLogs[device] || []).map((entry, index) => (
                                  <tr key={index}>
                                    <td>{entry.date}</td>
                                    <td>{entry.operator}</td>
                                    <td>{entry.notes}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                                    ยังไม่มีบันทึกข้อมูลการตรวจสอบ
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

        </div>
      </div>

      {/* ================= EMBED CONFIGURATION MODAL ================= */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{t[lang].embedSettings}</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            
            {modalPageId === 'rlu_dashboard' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Metabase Base URL
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={tempMetabaseBase} 
                    onChange={(e) => setTempMetabaseBase(e.target.value)} 
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Overall KPI Dashboard UUID
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={tempMetabaseUuids.overall} 
                    onChange={(e) => setTempMetabaseUuids({ ...tempMetabaseUuids, overall: e.target.value })} 
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    HbA1c Analysis Dashboard UUID
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={tempMetabaseUuids.hba1c} 
                    onChange={(e) => setTempMetabaseUuids({ ...tempMetabaseUuids, hba1c: e.target.value })} 
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    LDL Monitoring Dashboard UUID
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={tempMetabaseUuids.ldl} 
                    onChange={(e) => setTempMetabaseUuids({ ...tempMetabaseUuids, ldl: e.target.value })} 
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {t[lang].embedUrlLabel}
                </label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={tempEmbedUrl} 
                  onChange={(e) => setTempEmbedUrl(e.target.value)} 
                  placeholder="https://..."
                  style={{ width: '100%' }}
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  วางลิงก์ฝังจริงที่คัดลอกมาจาก Google Site หรือ Dashboard ของคุณเพื่อให้แสดงผลในพื้นที่แดชบอร์ดจริง
                </p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                {t[lang].cancel}
              </button>
              <button className="btn btn-primary" onClick={handleSaveConfig}>
                {t[lang].saveSettings}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
