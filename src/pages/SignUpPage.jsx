import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/login/AuthForm";
import supabase from "../supabase/client";
import Swal from "sweetalert2";

const SignUpPage = () => {
  const navigate = useNavigate();
  const SignUpHandler = async (formData) => {
    const { email, password, nickname } = formData;
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
      });
      if (error) throw error;
      const userId = data.user?.id;
      if (userId) {
        const { error: insertError } = await supabase
          .from("users")
          .insert([{ user_id: userId, user_nickname: nickname }]);
        if (insertError) throw insertError;
      }
      Swal.fire({
        title: "앗!",
        text: " 회원가입이 완료되었습니다",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "앗!",
        text: "회원가입 실패: " + err.message,
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-2xl font-semibold">회원가입</h1>
      <AuthForm mode="signup" onSubmit={SignUpHandler} />
      <Link
        to={"/"}
        className="py-3 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        로그인으로
      </Link>
    </div>
  );
};
export default SignUpPage;
