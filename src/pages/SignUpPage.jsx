import { useNavigate } from "react-router-dom";
import AuthForm from "../components/login/AuthForm";
import supabase from "../supabase/client";

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

      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (err) {
      alert("회원가입 실패: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-2xl font-semibold">😁 회원가입 😁</h1>
      <AuthForm mode="signup" onSubmit={SignUpHandler} />
    </div>
  );
};

export default SignUpPage;