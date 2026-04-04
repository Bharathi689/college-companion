import CrudTable from '../components/CrudTable';
import { format } from 'date-fns';

const columns = [
  { key:'title', label:'Title' },
  { key:'category', label:'Category', render: v => v ? <span className={`badge badge-${v==='Urgent'?'red':v==='Academic'?'blue':'gold'}`}>{v}</span> : '—' },
  { key:'content', label:'Content', render: v => v ? <span title={v}>{v.slice(0,60)}{v.length>60?'…':''}</span> : '—' },
  { key:'target', label:'Target', render: v => v ? <span className="badge badge-gray">{v}</span> : '—' },
  { key:'created_at', label:'Date', render: v => v ? format(new Date(v),'MMM d, yyyy') : '—' },
];

const formFields = [
  { key:'title', label:'Title', required:true },
  { key:'category', label:'Category', type:'select', options:['General','Academic','Urgent','Event','Exam','Holiday'] },
  { key:'target', label:'Target Audience', type:'select', options:['All','Students','Faculty','Staff'] },
  { key:'content', label:'Content', type:'textarea' },
];

export default function Announcements() {
  return <CrudTable resource="announcements" title="Announcements" columns={columns} formFields={formFields} emptyMsg="No announcements yet"/>;
}
