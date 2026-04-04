import CrudTable from '../components/CrudTable';

const columns = [
  { key:'student_id', label:'ID' },
  { key:'name', label:'Name' },
  { key:'course', label:'Course' },
  { key:'year', label:'Year' },
  { key:'section', label:'Section' },
  { key:'roll_no', label:'Roll No.' },
  { key:'phone', label:'Phone' },
  { key:'email', label:'Email' },
  { key:'category', label:'Category', render: v => v ? <span className="badge badge-gray">{v}</span> : '—' },
];

const formFields = [
  { key:'student_id', label:'Student ID' },
  { key:'name', label:'Full Name', required:true },
  { key:'course', label:'Course (e.g. B.Sc, B.Com, BA)', required:true },
  { key:'year', label:'Year', type:'select', options:['I','II','III'] },
  { key:'section', label:'Section' },
  { key:'roll_no', label:'Roll Number' },
  { key:'phone', label:'Phone Number', type:'tel' },
  { key:'email', label:'Email', type:'email' },
  { key:'dob', label:'Date of Birth', type:'date' },
  { key:'category', label:'Category', type:'select', options:['General','OBC','SC','ST','EWS','Minority'] },
  { key:'address', label:'Address', type:'textarea' },
  { key:'guardian', label:"Guardian's Name" },
  { key:'guardian_phone', label:"Guardian's Phone", type:'tel' },
];

export default function Students() {
  return <CrudTable resource="students" title="Students" columns={columns} formFields={formFields} emptyMsg="No student records found"/>;
}
