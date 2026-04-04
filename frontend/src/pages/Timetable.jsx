import CrudTable from '../components/CrudTable';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const dayColor = { Monday:'blue',Tuesday:'gold',Wednesday:'green',Thursday:'cyan',Friday:'purple',Saturday:'red' };

const columns = [
  { key:'day', label:'Day', render: v => v ? <span className={`badge badge-${dayColor[v]||'gray'}`}>{v}</span> : '—' },
  { key:'period', label:'Period' },
  { key:'time', label:'Time' },
  { key:'subject', label:'Subject' },
  { key:'faculty', label:'Faculty' },
  { key:'room', label:'Room' },
  { key:'course', label:'Course/Year' },
];

const formFields = [
  { key:'day', label:'Day', type:'select', options:DAYS, required:true },
  { key:'period', label:'Period No.', type:'number' },
  { key:'time', label:'Time (e.g. 09:00 - 09:55)' },
  { key:'subject', label:'Subject', required:true },
  { key:'faculty', label:'Faculty Name' },
  { key:'room', label:'Room / Lab' },
  { key:'course', label:'Course / Year / Section' },
];

export default function Timetable() {
  return <CrudTable resource="timetable" title="Timetable" columns={columns} formFields={formFields} emptyMsg="No timetable entries yet"/>;
}
