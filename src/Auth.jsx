import { useState } from "react";
import { supabase } from "./supabase";

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage("Check your email to confirm your account!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else onLogin();
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:"100vh",background:"#0d1117",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#131920",border:"1px solid #1e3050",borderRadius:12,padding:36,width:"100%",maxWidth:400,textAlign:"center"}}>
        <div style={{fontSize:28,fontWeight:700,color:"#fff",marginBottom:6}}>Total Lineup</div>
        <div style={{fontSize:14,color:"#4a9aff",marginBottom:28}}>Build Smarter Lineups. Win More.</div>
        <div style={{fontSize:18,fontWeight:700,color:"#e8f4ff",marginBottom:20}}>{isSignUp ? "Create Account" : "Welcome Back"}</div>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" type="email"
          style={{width:"100%",padding:"12px",borderRadius:6,border:"1px solid #1e3050",background:"#0d1117",color:"#fff",fontSize:14,marginBottom:12,boxSizing:"border-box"}}/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password"
          style={{width:"100%",padding:"12px",borderRadius:6,border:"1px solid #1e3050",background:"#0d1117",color:"#fff",fontSize:14,marginBottom:16,boxSizing:"border-box"}}/>
        {message && <div style={{color: message.includes("Check") ? "#4aaa4a" : "#ff6b6b",fontSize:13,marginBottom:12}}>{message}</div>}
        <button onClick={handleSubmit} disabled={loading}
          style={{width:"100%",padding:"13px",borderRadius:6,background:"#1a6fd4",color:"#fff",border:"none",fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:14}}>
          {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Log In"}
        </button>
        <button onClick={()=>{setIsSignUp(!isSignUp);setMessage("");}}
          style={{background:"transparent",border:"none",color:"#4a9aff",fontSize:13,cursor:"pointer"}}>
          {isSignUp ? "Already have an account? Log in" : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
}
