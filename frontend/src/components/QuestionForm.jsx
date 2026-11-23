import { useEffect, useState } from 'react';
const empty = { question: '', options: ['', '', '', ''], answer: '', operation: 'addition', difficulty: 'easy' };
export default function QuestionForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(empty);
  useEffect(() => { if (initial) setForm({ ...initial, options: initial.options.map(String), answer: String(initial.answer) }); else setForm(empty); }, [initial]);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const option = (i, value) => setForm({ ...form, options: form.options.map((v, n) => n === i ? value : v) });
  return <form className="panel p-3" onSubmit={e => { e.preventDefault(); onSave({ ...form, options: form.options.map(Number), answer: Number(form.answer) }); }}>
    <h5>{initial ? 'Edit question' : 'Add new question'}</h5>
    <label className="form-label">Question</label><input className="form-control mb-3" name="question" value={form.question} onChange={change} required placeholder="Example: 12 + 8 = ?" />
    <div className="row">{form.options.map((v,i)=><div className="col-md-6 mb-2" key={i}><label className="form-label">Option {i+1}</label><input className="form-control" type="number" value={v} onChange={e=>option(i,e.target.value)} required /></div>)}</div>
    <label className="form-label mt-2">Correct answer</label><select className="form-select mb-3" name="answer" value={form.answer} onChange={change} required><option value="">Choose correct value</option>{form.options.map((v,i)=><option key={i} value={v}>{v || `Option ${i+1}`}</option>)}</select>
    <div className="row"><div className="col-md-6 mb-3"><label className="form-label">Operation</label><select className="form-select" name="operation" value={form.operation} onChange={change}>{['addition','subtraction','multiplication','division'].map(x=><option key={x} value={x}>{x}</option>)}</select></div>
    <div className="col-md-6 mb-3"><label className="form-label">Difficulty</label><select className="form-select" name="difficulty" value={form.difficulty} onChange={change}>{['easy','medium','hard'].map(x=><option key={x}>{x}</option>)}</select></div></div>
    <button className="btn btn-primary me-2">Save question</button><button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
  </form>;
}
