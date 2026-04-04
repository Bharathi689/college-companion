import { useState, useEffect, useRef } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Download, Upload, Trash2, Edit2, X, Check, FileSpreadsheet } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CrudTable({
  resource, title, columns, formFields, badge, emptyMsg,
  extraActions, defaultValues = {}
}) {
  const { isAdmin } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState('');
  const fileRef = useRef();

  const load = () => {
    setLoading(true);
    api.get(`/${resource}`).then(r => setItems(r.data)).finally(() => setLoading(false));
  };
  useEffect(load, [resource]);

  const openCreate = () => { setEditItem(null); setForm(defaultValues); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setShowModal(true); };

  const save = async () => {
    try {
      if (editItem) { await api.put(`/${resource}/${editItem.id}`, form); toast.success('Updated!'); }
      else { await api.post(`/${resource}`, form); toast.success('Added!'); }
      setShowModal(false); load();
    } catch { toast.error('Save failed'); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    await api.delete(`/${resource}/${id}`); toast.success('Deleted'); load();
  };

  const downloadCSV = () => {
    window.open(`/api/${resource}/download-csv`);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append('file', file);
    try {
      const r = await api.post(`/${resource}/upload-csv`, fd, { headers: {'Content-Type':'multipart/form-data'} });
      toast.success(`Imported ${r.data.added} records`); load();
    } catch { toast.error('Upload failed'); }
    e.target.value = '';
  };

  const clearAll = async () => {
    if (!window.confirm(`Clear ALL ${title} records?`)) return;
    await api.delete(`/${resource}/clear`); toast.success('Cleared'); load();
  };

  const filtered = items.filter(item =>
    !search || Object.values(item).some(v =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:26 }}>{title}</h1>
          <p style={{ color:'var(--gray-600)', fontSize:14 }}>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <div className="search-bar">
            <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {isAdmin && (
            <>
              <button className="btn btn-gold btn-sm" onClick={openCreate}><Plus size={14}/>Add</button>
              <button className="btn btn-success btn-sm" onClick={() => fileRef.current.click()}><Upload size={14}/>Import CSV</button>
              <input type="file" accept=".csv,.xlsx" ref={fileRef} style={{ display:'none' }} onChange={handleFileUpload}/>
            </>
          )}
          <button className="btn btn-info btn-sm" onClick={downloadCSV} style={{ color:'#fff' }}><Download size={14}/>Export</button>
          {isAdmin && <button className="btn btn-danger btn-sm" onClick={clearAll}><Trash2 size={14}/>Clear All</button>}
        </div>
      </div>

      <div className="alert alert-info" style={{ marginBottom:12 }}>
        <FileSpreadsheet size={15}/>
        <span>You can <strong>Import CSV</strong> to bulk-upload data and <strong>Export CSV</strong> to download all records. Use the provided column headers when preparing your CSV file.</span>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {columns.map(c => <th key={c.key}>{c.label}</th>)}
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={columns.length + 1} style={{ textAlign:'center', padding:32, color:'var(--gray-400)' }}>Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={columns.length + 1}>
                  <div className="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                    <h3>{emptyMsg || 'No records found'}</h3>
                    <p>Add records manually or import a CSV file</p>
                  </div>
                </td></tr>
              ) : filtered.map(item => (
                <tr key={item.id}>
                  {columns.map(c => (
                    <td key={c.key}>
                      {c.render ? c.render(item[c.key], item) : (item[c.key] || '—')}
                    </td>
                  ))}
                  {isAdmin && (
                    <td>
                      <div style={{ display:'flex', gap:6 }}>
                        <button className="btn btn-sm btn-outline" onClick={() => openEdit(item)} style={{ padding:'4px 8px' }}><Edit2 size={13}/></button>
                        <button className="btn btn-sm btn-danger" onClick={() => remove(item.id)} style={{ padding:'4px 8px' }}><Trash2 size={13}/></button>
                        {extraActions && extraActions(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3>{editItem ? 'Edit Record' : `Add ${title}`}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><X size={18}/></button>
            </div>
            <div className="modal-body">
              {formFields.map(field => (
                <div className="form-group" key={field.key}>
                  <label className="form-label">{field.label}{field.required && <span style={{ color:'var(--danger)' }}> *</span>}</label>
                  {field.type === 'select' ? (
                    <select className="form-control" value={form[field.key] || ''} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}>
                      <option value="">Select…</option>
                      {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea className="form-control" value={form[field.key] || ''} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} rows={3}/>
                  ) : (
                    <input className="form-control" type={field.type || 'text'} value={form[field.key] || ''} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} placeholder={field.placeholder || ''}/>
                  )}
                </div>
              ))}
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
