import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/login/AuthForm";
import supabase from "../supabase/client";
import Swal from "sweetalert2";
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
      console.log("error in loginpage=>", error);
      navigate("/mainpage");
    } catch (err) {
      Swal.fire({
        title: "앗!",
        text: "로그인 실패: " + err.message,
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-2xl font-semibold">로그인</h1>
      <AuthForm mode={"login"} onSubmit={loginHandler} />
      <Link
        to={"/signup"}
        className="py-3 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        회원가입하기
      </Link>
    </div>
  );
};
export default LoginPage;
