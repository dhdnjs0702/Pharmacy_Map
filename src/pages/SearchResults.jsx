import React from "react";
import CompNavBar from "../common/CompNavBar";
import CompSearchBar from "../common/CompSearchBar";
import KakaoMap from "../components/KakaoMap";
import "../index.css";
import { Button, Typography, Input, Textarea } from "@material-tailwind/react";

const SearchResults = () => {
  return (
    <div>
      <CompNavBar />

      <div className="flex">
        
        {/* 왼쪽 패널: Contact Form */}
        <div className="w-1/3 p-4 bg-white shadow-md">
          <div className="flex items-center justify-between px-4 pb-2">
            {/* 닫기 아이콘은 고정 패널에서는 필요 없으므로 제거할 수 있습니다. */}
          </div>
          <CompSearchBar />

        </div>
        <KakaoMap />
      </div>
    </div>
  );
};

export default SearchResults;
