import CrudTable from '../components/CrudTable';

const columns = [
  { key:'title', label:'Event Title' },
  { key:'type', label:'Type', render: v => v ? <span className="badge badge-blue">{v}</span> : '—' },
  { key:'date', label:'Date' },
  { key:'time', label:'Time' },
  { key:'venue', label:'Venue' },
  { key:'organiser', label:'Organiser' },
  { key:'chief_guest', label:'Chief Guest' },
  { key:'status', label:'Status', render: v => {
    const color = v==='Completed'?'green':v==='Upcoming'?'gold':v==='Ongoing'?'blue':'red';
    return v ? <span className={`badge badge-${color}`}>{v}</span> : '—';
  }},
];

const formFields = [
  { key:'title', label:'Event Title', required:true },
  { key:'type', label:'Type', type:'select', options:['Annual Day','Cultural Event','Sports Day','Seminar','Workshop','Webinar','Orientation','Farewell','Inauguration','Celebration','Other'] },
  { key:'date', label:'Date', type:'date' },
  { key:'time', label:'Time' },
  { key:'venue', label:'Venue' },
  { key:'organiser', label:'Organiser / Department' },
  { key:'chief_guest', label:'Chief Guest' },
  { key:'status', label:'Status', type:'select', options:['Upcoming','Ongoing','Completed','Cancelled'] },
  { key:'description', label:'Description', type:'textarea' },
  { key:'expected_participants', label:'Expected Participants', type:'number' },
];

export default function Events() {
  return <CrudTable resource="events" title="Events" columns={columns} formFields={formFields}
    defaultValues={{ status:'Upcoming' }} emptyMsg="No events added yet"/>;
}
