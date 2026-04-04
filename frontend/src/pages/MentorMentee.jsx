import CrudTable from '../components/CrudTable';

const columns = [
  { key:'mentor_name', label:'Mentor (Faculty)' },
  { key:'mentee_name', label:'Mentee (Student)' },
  { key:'mentee_roll', label:'Roll No.' },
  { key:'course', label:'Course/Year' },
  { key:'meeting_date', label:'Last Meeting' },
  { key:'topic', label:'Topic Discussed' },
  { key:'status', label:'Status', render: v => v ? <span className={`badge badge-${v==='Active'?'green':'gray'}`}>{v}</span> : '—' },
  { key:'next_meeting', label:'Next Meeting' },
];

const formFields = [
  { key:'mentor_name', label:'Mentor Name (Faculty)', required:true },
  { key:'mentee_name', label:'Mentee Name (Student)', required:true },
  { key:'mentee_roll', label:'Mentee Roll Number' },
  { key:'course', label:'Course / Year' },
  { key:'meeting_date', label:'Meeting Date', type:'date' },
  { key:'topic', label:'Topic / Issues Discussed', type:'textarea' },
  { key:'observations', label:'Observations / Recommendations', type:'textarea' },
  { key:'status', label:'Status', type:'select', options:['Active','Inactive','Completed'] },
  { key:'next_meeting', label:'Next Meeting Date', type:'date' },
];

export default function MentorMentee() {
  return <CrudTable resource="mentors" title="Mentor / Mentee" columns={columns} formFields={formFields}
    defaultValues={{ status:'Active' }} emptyMsg="No mentor-mentee records found"/>;
}
