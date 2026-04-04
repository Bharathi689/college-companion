import CrudTable from '../components/CrudTable';

const columns = [
  { key:'faculty_id', label:'ID' },
  { key:'name', label:'Name' },
  { key:'designation', label:'Designation' },
  { key:'department', label:'Department' },
  { key:'qualification', label:'Qualification' },
  { key:'phone', label:'Phone' },
  { key:'email', label:'Email' },
  { key:'specialization', label:'Specialization' },
  { key:'type', label:'Type', render: v => v ? <span className={`badge badge-${v==='Regular'?'green':v==='Contract'?'gold':'blue'}`}>{v}</span> : '—' },
];

const formFields = [
  { key:'faculty_id', label:'Faculty ID' },
  { key:'name', label:'Full Name', required:true },
  { key:'designation', label:'Designation', type:'select', options:['Professor','Associate Professor','Assistant Professor','Guest Lecturer','Lecturer','Lab Instructor','Librarian','Physical Director'] },
  { key:'department', label:'Department', required:true },
  { key:'qualification', label:'Qualification (e.g. M.Sc, M.Com, Ph.D)' },
  { key:'specialization', label:'Specialization' },
  { key:'phone', label:'Phone', type:'tel' },
  { key:'email', label:'Email', type:'email' },
  { key:'type', label:'Employment Type', type:'select', options:['Regular','Contract','Guest','Visiting'] },
  { key:'joining_date', label:'Joining Date', type:'date' },
  { key:'experience', label:'Experience (years)', type:'number' },
];

export default function Faculty() {
  return <CrudTable resource="faculty" title="Faculty" columns={columns} formFields={formFields} emptyMsg="No faculty records found"/>;
}
