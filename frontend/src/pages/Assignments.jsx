import CrudTable from '../components/CrudTable';

const columns = [
  { key:'title', label:'Assignment Title' },
  { key:'subject', label:'Subject' },
  { key:'course', label:'Course/Year' },
  { key:'faculty', label:'Faculty' },
  { key:'due_date', label:'Due Date' },
  { key:'marks', label:'Max Marks' },
  { key:'status', label:'Status', render: v => {
    const color = v==='Submitted'?'green':v==='Pending'?'gold':v==='Overdue'?'red':'blue';
    return v ? <span className={`badge badge-${color}`}>{v}</span> : '—';
  }},
];

const formFields = [
  { key:'title', label:'Assignment Title', required:true },
  { key:'subject', label:'Subject', required:true },
  { key:'course', label:'Course / Year' },
  { key:'faculty', label:'Assigned By (Faculty)' },
  { key:'due_date', label:'Due Date', type:'date' },
  { key:'marks', label:'Maximum Marks', type:'number' },
  { key:'status', label:'Status', type:'select', options:['Pending','Submitted','Evaluated','Overdue'] },
  { key:'instructions', label:'Instructions', type:'textarea' },
];

export default function Assignments() {
  return <CrudTable resource="assignments" title="Assignments" columns={columns} formFields={formFields}
    defaultValues={{ status:'Pending' }} emptyMsg="No assignments yet"/>;
}
