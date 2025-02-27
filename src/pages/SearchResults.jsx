import React from "react";
import CompNavBar from "../common/CompNavBar";
import CompSearchBar from "../common/CompSearchBar";
import KakaoMap from "../components/KakaoMap";
import "../index.css";

const SearchResults = () => {
  return (
    <div>
      <CompNavBar />
      <div className="relative">
        {/* KakaoMap가 전체 배경을 채우고, 그 위에 좌측 패널이 모달처럼 떠 있도록 */}
        <KakaoMap />
        <div className="absolute top-5 left-5 w-[28.57%] p-4 bg-white shadow-md z-10">
          <CompSearchBar />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
