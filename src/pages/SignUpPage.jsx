import React, { useState } from "react";

const SignUpPage = () => {
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

  return (
    <div>
      <h1>회원가입을 해주세요!</h1>

      <form className="mt-8 flex flex-col gap-3">
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={ChangeHandler}
          placeholder="로그인 시 사용되는 아이디입니다."
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={ChangeHandler}
          placeholder="로그인 시 사용되는 비밀번호입니다."
        />
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={ChangeHandler}
          placeholder="로그인 시 사용되는 닉네임입니다."
        />
      </form>
    </div>
  );
};

export default SignUpPage;
