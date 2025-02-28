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
    <div>
      <form
        className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg"
        onSubmit={SubmitHandler}
      >
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={ChangeHandler}
          placeholder="로그인 시 사용되는 닉네임입니다."
          className="p-3 rounded-md border border-[#000000] text-m w-80 focus:outline-none focus:ring-2 focus:ring-red-700"
        />
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={ChangeHandler}
          placeholder="로그인 시 사용되는 아이디입니다."
          className="p-3 border border-[#000000] rounded-md text-m w-80 focus:outline-none focus:ring-2 focus:ring-red-700"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={ChangeHandler}
          placeholder="로그인 시 사용되는 비밀번호입니다."
          className="p-3 border border-[#000000] rounded-md text-m w-80 focus:outline-none focus:ring-2 focus:ring-red-700"
        />
        <button
          type={"submit"}
          className="mt-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
