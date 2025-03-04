import { useState } from "react";
import Swal from "sweetalert2";

const CompSearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      Swal.fire({
        title: "앗!",
        text: "키워드를 입력해주세요",
        icon: "question",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      });
      return false;
    }
    onSearch(keyword);
  };

  return (
    <div className="option">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={keyword}
            id="keyword"
            onChange={handleKeywordChange}
            placeholder="약국명으로 검색"
          />
          <button type="submit">검색</button>
        </div>
      </form>
    </div>
  );
};

export default CompSearchBar;
