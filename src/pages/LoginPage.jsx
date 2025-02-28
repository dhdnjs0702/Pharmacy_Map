import React from "react";
import AuthForm from "../components/login/AuthForm";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginHandler = async (formData) => {
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("로그인 실패!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-2xl font-semibold">😊 로그인이 필요합니다 😊</h1>
      <AuthForm mode={"login"} onSubmit={loginHandler} />
    </div>
  );
};

export default LoginPage;
