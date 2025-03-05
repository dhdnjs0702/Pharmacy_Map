import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/login/AuthForm";
import supabase from "../supabase/client";
const LoginPage = () => {
  const navigate = useNavigate();
  const loginHandler = async (formData) => {
    const { email, password } = formData;
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });
      if (error) throw error;
      alert("로그인 성공!");
      navigate("/mainpage");
    } catch (err) {
      alert("로그인 실패: " + err.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-2xl font-semibold">로그인</h1>
      <AuthForm mode={"login"} onSubmit={loginHandler} />
      <Link to={"/signup"}>회원가입하기</Link>
    </div>
  );
};
export default LoginPage;
