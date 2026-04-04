import { useState, useRef } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Plus, Download, Upload, Trash2, Edit2, X, Check, FileSpreadsheet } from 'lucide-react';

// ─── Tab definitions ─────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: 'skill',
    label: 'Skill Enhancement Activity',
    color: 'var(--royal-blue)',
    tabs: [
      { id: 'certificate_courses', label: 'Certificate Courses', emoji: '🎓',
        fields: ['student_name','roll_no','course','year','certificate_name','issuing_body','duration','completion_date','grade','remarks'],
        columns: ['student_name','roll_no','course','certificate_name','issuing_body','completion_date','grade'] },
      { id: 'student_research', label: 'Student Research Projects', emoji: '🔬',
        fields: ['student_name','roll_no','course','year','project_title','guide_name','funding','status','completion_date','remarks'],
        columns: ['student_name','roll_no','project_title','guide_name','funding','status','completion_date'] },
      { id: 'fieldtech_projects', label: 'Fieldtech Projects', emoji: '🏗️',
        fields: ['student_name','roll_no','course','year','project_title','field_area','collaborating_org','start_date','end_date','outcome'],
        columns: ['student_name','project_title','field_area','collaborating_org','start_date','end_date','outcome'] },
      { id: 'online_courses', label: 'Online Courses (MOOCs)', emoji: '🌐',
        fields: ['student_name','roll_no','course','year','mooc_title','platform','duration','completion_date','certificate_url','grade'],
        columns: ['student_name','mooc_title','platform','duration','completion_date','grade'] },
      { id: 'jignasa', label: 'Jignasa', emoji: '💡',
        fields: ['student_name','roll_no','course','year','event_name','event_type','date','venue','achievement','remarks'],
        columns: ['student_name','event_name','event_type','date','venue','achievement'] },
    ]
  },
  {
    id: 'student_centric',
    label: 'Student Centric Activities',
    color: 'var(--gold)',
    tabs: [
      { id: 'bridge_courses', label: 'Bridge Courses', emoji: '🌉',
        fields: ['student_name','roll_no','course','year','subject','faculty_name','start_date','end_date','no_of_sessions','outcome'],
        columns: ['student_name','subject','faculty_name','start_date','end_date','no_of_sessions','outcome'] },
      { id: 'group_discussions', label: 'Group Discussions', emoji: '💬',
        fields: ['topic','date','course','year','faculty_coordinator','no_of_students','outcome','remarks'],
        columns: ['topic','date','course','faculty_coordinator','no_of_students','outcome'] },
      { id: 'student_seminars', label: 'Student Seminars', emoji: '🎤',
        fields: ['student_name','roll_no','course','year','seminar_title','date','venue','faculty_guide','duration','remarks'],
        columns: ['student_name','seminar_title','date','venue','faculty_guide','duration'] },
      { id: 'quiz', label: 'Quiz', emoji: '❓',
        fields: ['student_name','roll_no','course','year','quiz_title','date','subject','score','total_marks','rank'],
        columns: ['student_name','quiz_title','date','subject','score','total_marks','rank'] },
      { id: 'assignments_tab', label: 'Assignments', emoji: '📝',
        fields: ['student_name','roll_no','course','year','subject','assignment_title','due_date','submitted_date','marks_obtained','max_marks','faculty'],
        columns: ['student_name','subject','assignment_title','due_date','submitted_date','marks_obtained','max_marks'] },
    ]
  },
  {
    id: 'other',
    label: 'Other Activities',
    color: '#7c3aed',
    tabs: [
      { id: 'extension_lectures', label: 'Extension Lectures', emoji: '📢',
        fields: ['speaker_name','designation','organisation','topic','date','venue','course','no_of_participants','outcome'],
        columns: ['speaker_name','topic','date','venue','course','no_of_participants'] },
      { id: 'workshops', label: 'Workshops', emoji: '🛠️',
        fields: ['workshop_title','resource_person','date','venue','duration','course','no_of_participants','skills_gained','remarks'],
        columns: ['workshop_title','resource_person','date','venue','duration','no_of_participants'] },
      { id: 'video_lessons', label: 'Video Lessons', emoji: '🎬',
        fields: ['title','subject','course','year','faculty','platform','url','duration','views','remarks'],
        columns: ['title','subject','course','faculty','platform','url','views'] },
      { id: 'results', label: 'Results', emoji: '📊',
        fields: ['student_name','roll_no','course','year','semester','subject','marks_obtained','max_marks','grade','result'],
        columns: ['student_name','roll_no','course','semester','subject','marks_obtained','max_marks','grade','result'] },
      { id: 'elibrary', label: 'E-Library', emoji: '📚',
        fields: ['title','author','subject','type','url','published_year','access_type','remarks'],
        columns: ['title','author','subject','type','url','published_year','access_type'] },
      { id: 'technology_updates', label: 'Technology Updates', emoji: '💻',
        fields: ['title','topic_area','date','source','summary','shared_with','relevance','url'],
        columns: ['title','topic_area','date','source','shared_with','relevance'] },
      { id: 'career_guidance', label: 'Career Guidance', emoji: '🧭',
        fields: ['programme_title','date','resource_person','course','no_of_students','topics_covered','outcome','remarks'],
        columns: ['programme_title','date','resource_person','course','no_of_students','outcome'] },
      { id: 'personal_counselling', label: 'Personal Counselling', emoji: '🤝',
        fields: ['student_name','roll_no','course','year','counsellor','date','issue_type','action_taken','follow_up_date','status'],
        columns: ['student_name','course','counsellor','date','issue_type','status'] },
      { id: 'social_responsibilities', label: 'Social Responsibilities', emoji: '🌍',
        fields: ['activity_name','date','venue','no_of_participants','community_benefited','faculty_coordinator','outcome','remarks'],
        columns: ['activity_name','date','venue','no_of_participants','community_benefited','faculty_coordinator'] },
      { id: 'tsat_lessons', label: 'T-SAT Lessons', emoji: '📺',
        fields: ['title','subject','course','year','broadcast_date','channel','faculty','topic','duration','remarks'],
        columns: ['title','subject','course','broadcast_date','channel','faculty','duration'] },
      { id: 'remedial_coaching', label: 'Remedial Coaching', emoji: '📖',
        fields: ['student_name','roll_no','course','year','subject','faculty','start_date','end_date','no_of_sessions','outcome'],
        columns: ['student_name','subject','faculty','start_date','end_date','no_of_sessions','outcome'] },
      { id: 'tech_skills_advanced', label: 'Tech Skills Advanced Learners', emoji: '🚀',
        fields: ['student_name','roll_no','course','year','skill_name','tool_software','trainer','start_date','end_date','level','certification'],
        columns: ['student_name','skill_name','tool_software','trainer','start_date','end_date','level'] },
    ]
  }
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function prettify(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ─── TabPanel ────────────────────────────────────────────────────────────────
function TabPanel({ tab }) {
  const { isAdmin } = useAuth();
  const [records, setRecords] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState('');
  const fileRef = useRef();

  const resourceKey = `tab_${tab.id}`;

  const load = () => {
    api.get(`/tab_records?tab_id=${tab.id}`).then(r => {
      // filter by tab_id since we share the tab_records endpoint
      setRecords(r.data.filter(x => x.tab_id === tab.id));
      setLoaded(true);
    });
  };

  if (!loaded) load();

  const openCreate = () => { setEditItem(null); setForm({ tab_id: tab.id }); setShowModal(true); };
  const openEdit = item => { setEditItem(item); setForm({ ...item }); setShowModal(true); };

  const save = async () => {
    try {
      const payload = { ...form, tab_id: tab.id };
      if (editItem) { await api.put(`/tab_records/${editItem.id}`, payload); toast.success('Updated!'); }
      else { await api.post('/tab_records', payload); toast.success('Added!'); }
      setShowModal(false); setLoaded(false);
    } catch { toast.error('Save failed'); }
  };

  const remove = async id => {
    if (!window.confirm('Delete this record?')) return;
    await api.delete(`/tab_records/${id}`); toast.success('Deleted'); setLoaded(false);
  };

  const handleUpload = async e => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append('file', file);
    // We append tab_id as a query param workaround
    try {
      const r = await api.post(`/tab_records/upload-csv?tab_id=${tab.id}`, fd, { headers:{'Content-Type':'multipart/form-data'} });
      // After upload, re-tag each imported record - done server side normally; here we patch
      toast.success(`Imported ${r.data.added} records`); setLoaded(false);
    } catch { toast.error('Upload failed'); }
    e.target.value = '';
  };

  const downloadCSV = () => {
    const filtered = records;
    if (!filtered.length) { toast('No data to export'); return; }
    const keys = tab.columns;
    const rows = [keys.join(','), ...filtered.map(r => keys.map(k => `"${(r[k]||'').toString().replace(/"/g,'""')}"`).join(','))];
    const blob = new Blob([rows.join('\n')], { type:'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${tab.id}.csv`; a.click();
  };

  const clearAll = async () => {
    if (!window.confirm(`Clear all ${tab.label} records?`)) return;
    for (const r of records) await api.delete(`/tab_records/${r.id}`);
    toast.success('Cleared'); setLoaded(false);
  };

  const filtered = records.filter(item =>
    !search || Object.values(item).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14, alignItems:'center' }}>
        <div className="search-bar" style={{ flex:1, minWidth:160 }}>
          <svg width="13" height="13" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {isAdmin && <>
          <button className="btn btn-gold btn-sm" onClick={openCreate}><Plus size={13}/>Add</button>
          <button className="btn btn-success btn-sm" onClick={() => fileRef.current.click()}><Upload size={13}/>Import CSV</button>
          <input type="file" accept=".csv" ref={fileRef} style={{display:'none'}} onChange={handleUpload}/>
        </>}
        <button className="btn btn-info btn-sm" style={{color:'#fff'}} onClick={downloadCSV}><Download size={13}/>Export CSV</button>
        {isAdmin && <button className="btn btn-danger btn-sm" onClick={clearAll}><Trash2 size={13}/>Clear</button>}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state" style={{ padding:32 }}>
          <div style={{ fontSize:32 }}>{tab.emoji}</div>
          <h3 style={{ marginTop:8 }}>No {tab.label} records</h3>
          <p>Add manually or import a CSV file</p>
          {isAdmin && <button className="btn btn-gold" style={{ marginTop:12 }} onClick={openCreate}><Plus size={14}/>Add First Record</button>}
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {tab.columns.map(k => <th key={k}>{prettify(k)}</th>)}
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  {tab.columns.map(k => <td key={k}>{item[k] || '—'}</td>)}
                  {isAdmin && (
                    <td>
                      <div style={{display:'flex',gap:6}}>
                        <button className="btn btn-sm btn-outline" onClick={() => openEdit(item)} style={{padding:'4px 8px'}}><Edit2 size={13}/></button>
                        <button className="btn btn-sm btn-danger" onClick={() => remove(item.id)} style={{padding:'4px 8px'}}><Trash2 size={13}/></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>{editItem ? 'Edit' : 'Add'} {tab.label}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={18}/></button>
            </div>
            <div className="modal-body">
              <div className="grid-2">
                {tab.fields.map(field => (
                  <div className="form-group" key={field}>
                    <label className="form-label">{prettify(field)}</label>
                    <input className="form-control" value={form[field] || ''}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      placeholder={prettify(field)}
                      type={field.includes('date') ? 'date' : field.includes('marks') || field.includes('score') || field.includes('no_of') || field.includes('duration') ? 'number' : 'text'}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}><Check size={14}/>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main CollegeTabs page ───────────────────────────────────────────────────
export default function CollegeTabs() {
  const [activeSection, setActiveSection] = useState('skill');
  const [activeTab, setActiveTab] = useState(SECTIONS[0].tabs[0].id);

  const section = SECTIONS.find(s => s.id === activeSection);
  const tab = section?.tabs.find(t => t.id === activeTab) || section?.tabs[0];

  const switchSection = sid => {
    setActiveSection(sid);
    setActiveTab(SECTIONS.find(s => s.id === sid).tabs[0].id);
  };

  return (
    <div>
      <div className="page-header">
        <h1>College Tabs</h1>
        <p>Manage all academic activity records — upload, download, edit with full CRUD support</p>
      </div>

      {/* Section selector */}
      <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
        {SECTIONS.map(s => (
          <button key={s.id}
            onClick={() => switchSection(s.id)}
            style={{
              padding:'9px 20px', borderRadius:'var(--radius-sm)', border:'none', cursor:'pointer',
              fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:13.5, transition:'all 0.18s',
              background: activeSection === s.id ? s.color : 'var(--gray-100)',
              color: activeSection === s.id ? '#fff' : 'var(--gray-600)',
              boxShadow: activeSection === s.id ? `0 4px 12px ${s.color}40` : 'none',
            }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Tab list */}
      <div style={{
        background:'#fff', borderRadius:'var(--radius)', border:'1px solid var(--gray-200)',
        marginBottom:16, padding:'6px 12px', display:'flex', flexWrap:'wrap', gap:4,
        boxShadow:'var(--shadow-sm)'
      }}>
        {section?.tabs.map(t => (
          <button key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding:'7px 14px', borderRadius:6, border:'none', cursor:'pointer',
              fontFamily:'DM Sans,sans-serif', fontSize:13, transition:'all 0.15s',
              background: activeTab === t.id ? section.color : 'transparent',
              color: activeTab === t.id ? '#fff' : 'var(--gray-600)',
              fontWeight: activeTab === t.id ? 600 : 400,
            }}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      {tab && (
        <div className="card">
          <div className="card-header" style={{ background:`${section.color}08` }}>
            <h3 style={{ color: section.color }}>{tab.emoji} {tab.label}</h3>
            <span style={{ fontSize:12, color:'var(--gray-400)' }}>Upload CSV or add records manually</span>
          </div>
          <div className="card-body">
            <div className="alert alert-info" style={{ marginBottom:14 }}>
              <FileSpreadsheet size={14}/>
              <span>CSV columns: <strong>{tab.columns.join(', ')}</strong></span>
            </div>
            <TabPanel key={tab.id} tab={tab} />
          </div>
        </div>
      )}
    </div>
  );
}
