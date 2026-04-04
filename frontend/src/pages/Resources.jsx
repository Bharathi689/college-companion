import CrudTable from '../components/CrudTable';

const typeIcon = { 'Video Lesson':'🎬','PPT':'📊','Study Material':'📄','E-Library':'📚','Technology Update':'💡','T-SAT Lesson':'📺','Online Course':'🌐' };

const columns = [
  { key:'title', label:'Title' },
  { key:'type', label:'Type', render: v => v ? <span>{typeIcon[v]||'📎'} {v}</span> : '—' },
  { key:'subject', label:'Subject' },
  { key:'course', label:'Course/Year' },
  { key:'link', label:'Link', render: v => v ? <a href={v} target="_blank" rel="noreferrer" style={{ color:'var(--royal-blue)', fontSize:12.5 }}>Open ↗</a> : '—' },
  { key:'uploaded_by', label:'Uploaded By' },
];

const formFields = [
  { key:'title', label:'Resource Title', required:true },
  { key:'type', label:'Type', type:'select', options:['Video Lesson','PPT','Study Material','E-Library','Technology Update','T-SAT Lesson','Online Course','Reference Book','Question Paper','Other'] },
  { key:'subject', label:'Subject' },
  { key:'course', label:'Course / Year' },
  { key:'link', label:'URL / Link', placeholder:'https://...' },
  { key:'uploaded_by', label:'Uploaded By' },
  { key:'description', label:'Description', type:'textarea' },
];

export default function Resources() {
  return <CrudTable resource="resources" title="Resources & Library" columns={columns} formFields={formFields} emptyMsg="No resources uploaded yet"/>;
}
