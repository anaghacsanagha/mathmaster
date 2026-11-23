import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
export default function Auth({ mode }) {
 const isRegister=mode==='register', [form,setForm]=useState({name:'',email:'',password:''}), [busy,setBusy]=useState(false);
 const {login,register}=useAuth(), navigate=useNavigate();
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{e.preventDefault();setBusy(true);try{const u=isRegister?await register(form):await login(form.email,form.password);await Swal.fire({icon:'success',title:isRegister?'Account created':'Welcome back',timer:1100,showConfirmButton:false});navigate(u.role==='admin'?'/admin':'/dashboard');}catch(err){Swal.fire('Oops',err.message||'Something went wrong','error');}finally{setBusy(false);}};
 return <div className="auth-wrap"><form className="panel auth-card p-4" onSubmit={submit}><h2 className="fw-bold mb-1">{isRegister?'Create account':'Welcome back'}</h2><p className="text-muted mb-4">{isRegister?'Join MathMaster and start practising.':'Log in to continue your practice.'}</p>
 {isRegister&&<><label className="form-label">Full name</label><input className="form-control mb-3" name="name" value={form.name} onChange={change} required /></>}
 <label className="form-label">Email</label><input className="form-control mb-3" type="email" name="email" value={form.email} onChange={change} required />
 <label className="form-label">Password</label><input className="form-control mb-3" type="password" name="password" minLength="6" value={form.password} onChange={change} required />
 <button className="btn btn-primary w-100" disabled={busy}>{busy?'Please wait...':isRegister?'Register':'Login'}</button>
 <p className="text-center mt-3 mb-0">{isRegister?'Already registered?':'New here?'} <Link to={isRegister?'/login':'/register'}>{isRegister?'Login':'Create account'}</Link></p></form></div>;
}
