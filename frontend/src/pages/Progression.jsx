import CrudTable from '../components/CrudTable';

const columns = [
  { key:'student_name', label:'Student Name' },
  { key:'roll_no', label:'Roll No.' },
  { key:'course', label:'Course/Year' },
  { key:'type', label:'Type', render: v => v ? <span className={`badge badge-${v==='Placement'?'green':v==='Higher Studies'?'blue':v==='Achievement'?'gold':'purple'}`}>{v}</span> : '—' },
  { key:'details', label:'Details' },
  { key:'organisation', label:'Organisation / University' },
  { key:'year', label:'Year' },
  { key:'package', label:'Package / Scholarship' },
];

const formFields = [
  { key:'student_name', label:'Student Name', required:true },
  { key:'roll_no', label:'Roll Number' },
  { key:'course', label:'Course / Passout Year' },
  { key:'type', label:'Progression Type', type:'select', options:['Placement','Higher Studies','Achievement','Competitive Exam','Entrepreneur','Govt. Job','Other'] },
  { key:'details', label:'Details', type:'textarea' },
  { key:'organisation', label:'Organisation / University / Exam' },
  { key:'year', label:'Year', type:'number' },
  { key:'package', label:'Package / Stipend / Scholarship' },
  { key:'remarks', label:'Remarks', type:'textarea' },
];

export default function Progression() {
  return <CrudTable resource="progressions" title="Student Progression" columns={columns} formFields={formFields} emptyMsg="No progression records found"/>;
}
