import CrudTable from '../components/CrudTable';

const columns = [
  { key:'student_name', label:'Student Name' },
  { key:'roll_no', label:'Roll No.' },
  { key:'course', label:'Course' },
  { key:'category', label:'Category', render: v => v ? <span className="badge badge-blue">{v}</span> : '—' },
  { key:'subject', label:'Grievance Subject' },
  { key:'status', label:'Status', render: v => {
    const color = v==='Resolved'?'green':v==='Open'?'red':v==='In Progress'?'gold':'gray';
    return v ? <span className={`badge badge-${color}`}>{v}</span> : '—';
  }},
  { key:'date_submitted', label:'Date Submitted' },
  { key:'assigned_to', label:'Assigned To' },
];

const formFields = [
  { key:'student_name', label:'Student Name', required:true },
  { key:'roll_no', label:'Roll Number' },
  { key:'course', label:'Course / Year' },
  { key:'phone', label:'Contact Phone', type:'tel' },
  { key:'category', label:'Category', type:'select', options:['Academic','Administrative','Infrastructure','Harassment','Financial','Faculty Related','Library','Hostel','Other'] },
  { key:'subject', label:'Grievance Subject', required:true },
  { key:'description', label:'Detailed Description', type:'textarea' },
  { key:'date_submitted', label:'Date Submitted', type:'date' },
  { key:'status', label:'Status', type:'select', options:['Open','In Progress','Resolved','Rejected'] },
  { key:'assigned_to', label:'Assigned To (Committee/Person)' },
  { key:'resolution', label:'Resolution / Remarks', type:'textarea' },
];

export default function Grievances() {
  return <CrudTable resource="grievances" title="Grievances" columns={columns} formFields={formFields}
    defaultValues={{ status:'Open' }} emptyMsg="No grievances recorded"/>;
}
