import CrudTable from '../components/CrudTable';

const columns = [
  { key:'title', label:'Title' },
  { key:'type', label:'Type', render: v => v ? <span className="badge badge-blue">{v}</span> : '—' },
  { key:'date', label:'Date' },
  { key:'venue', label:'Venue' },
  { key:'coordinator', label:'Coordinator' },
  { key:'status', label:'Status', render: v => {
    const color = v==='Completed'?'green':v==='Upcoming'?'gold':'blue';
    return v ? <span className={`badge badge-${color}`}>{v}</span> : '—';
  }},
];

const formFields = [
  { key:'title', label:'Activity Title', required:true },
  { key:'type', label:'Type', type:'select', options:[
    'Quiz','Assignment','Seminar','Jignasa','Tech Sakhi Club','Career Guidance',
    'Workshop','Extension Lecture','Group Discussion','Student Project',
    'Certificate Course','Online Course (MOOC)','Field Trip','Remedial Class',
    'Bridge Course','Social Responsibility Activity','Other'
  ]},
  { key:'date', label:'Date', type:'date' },
  { key:'venue', label:'Venue' },
  { key:'coordinator', label:'Coordinator' },
  { key:'status', label:'Status', type:'select', options:['Upcoming','Ongoing','Completed','Cancelled'] },
  { key:'description', label:'Description', type:'textarea' },
  { key:'participants', label:'No. of Participants', type:'number' },
];

export default function Activities() {
  return <CrudTable resource="activities" title="Activities" columns={columns} formFields={formFields}
    defaultValues={{ status:'Upcoming' }} emptyMsg="No activities added yet"/>;
}
