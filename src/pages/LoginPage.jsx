import { useNavigate } from "react-router-dom";
import AuthForm from "../components/login/AuthForm";
import supabase from "../supabase/client";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');

  const loginHandler = async (formData) => {
    const { email, password } = formData;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) throw error;
      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      alert("로그인 실패: " + err.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-2xl font-semibold">{mode==="login"? "😁로그인😁": "😉회원가입😉"}</h1>
      <AuthForm mode={mode} onSubmit={loginHandler} setMode={setMode} />
    </div>
  );
};

export default LoginPage;
