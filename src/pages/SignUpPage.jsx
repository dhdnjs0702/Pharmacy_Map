import React from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/login/AuthForm";

const SignUpPage = () => {
  const navigate = useNavigate();

  const SingUpHandler = async (formData) => {
    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("이미 존재하는 ID입니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-2xl font-semibold">😁 회원가입을 해주세요 😁</h1>
      <AuthForm mode={"signup"} onSubmit={SingUpHandler} />
    </div>
  );
};

export default SignUpPage;
