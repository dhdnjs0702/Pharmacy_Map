import React, { useState } from "react";

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const ChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-[#9c9a9a] p-8 rounded-lg shadow-lg w-full max-w-md">
        <form className="flex flex-col gap-4" onSubmit={SubmitHandler}>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={ChangeHandler}
            placeholder="로그인 시 사용되는 닉네임입니다."
            className="p-3 border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
          />
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={ChangeHandler}
            placeholder="로그인 시 사용되는 아이디입니다."
            className="p-3 border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={ChangeHandler}
            placeholder="로그인 시 사용되는 비밀번호입니다."
            className="p-3 border border-[#000000] rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
          />
          <button
            type={"submit"}
            className="mt-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
