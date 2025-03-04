import React, { useState } from "react";
import Swal from "sweetalert2";
import "./CompSearchBar.css"; // 검색 바 전용 CSS import

const CompSearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      Swal.fire({
        title: "앗!",
        text: "키워드를 입력해주세요",
        icon: "question",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    onSearch(keyword);
  };

  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="약국명을 검색해 주세요."
        value={keyword}
        onChange={handleKeywordChange}
      />
      <button type="submit" className="search-button">
        검색
      </button>
    </form>
  );
};

export default CompSearchBar;
