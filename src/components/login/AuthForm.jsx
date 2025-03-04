import { useState } from "react";

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "", // 닉네임 추가
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 rounded-lg shadow-lg bg-white"
    >
      <input
        type="email"
        name="email"
        placeholder="사용하실 email을 입력해 주세요."
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-3 border-2 border-[#e08c8c] rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
      />
      <input
        type="password"
        name="password"
        placeholder="사용하실 비밀번호를 입력해 주세요."
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-3 border-2 border-[#e08c8c] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      {mode === "signup" && (
        <input
          type="text"
          name="nickname"
          placeholder="사용하실 닉네임을 입력해 주세요."
          value={formData.nickname}
          onChange={handleChange}
          required
          className="w-full p-3 border-2 border-[#e08c8c] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      )}
      <button
        type="submit"
        className="w-full py-3 bg-red-400 text-white font-semibold rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        {mode === "signup" ? "회원등록" : "로그인"}
      </button>
    </form>
  );
};

export default AuthForm;
