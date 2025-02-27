import React, { useState } from "react";

const CompSearchBar = () => {
  // 예시 동 목록 (실제 데이터는 API 또는 서버에서 받아올 수 있습니다)
  const dongList = [
    "이태원동",
    "한남동",
    "후암동",
    "용문동",
    "원효로1가",
    // 추가 항목...
  ];
  const [selectedDong, setSelectedDong] = useState("용산구 동 선택");
  const [searchTerm, setSearchTerm] = useState("");

  // "현재 위치로 검색" 버튼 클릭 시 실행할 로직
  const handleCurrentLocationSearch = () => {
    console.log("현재 위치로 검색 로직 실행");
    // 예: Geolocation API 등 활용
  };

  // 검색 폼 제출 시 실행할 로직
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("선택된 동:", selectedDong);
    console.log("검색어:", searchTerm);
    // 원하는 API 호출 또는 페이지 이동 로직 추가
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row items-center sm:space-x-3 space-y-3 sm:space-y-0"
    >
      {/* 동 선택 드롭다운 */}
      <div className="relative">
        <select
          value={selectedDong}
          onChange={(e) => setSelectedDong(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option disabled>용산구 동 선택</option>
          {dongList.map((dong, idx) => (
            <option key={idx} value={dong}>
              {dong}
            </option>
          ))}
        </select>
      </div>

      {/* 현재 위치로 검색 버튼 */}
      <button
        type="button"
        onClick={handleCurrentLocationSearch}
        className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        현재 위치로 검색
      </button>

      {/* 약국 검색 인풋 */}
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="약국 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        {/* 돋보기 아이콘 */}
        <svg
          className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0a7 7 0 1111.1-11.1 7 7 0 01-11.1 11.1z"
          />
        </svg>
      </div>

      {/* 큰 화면에서는 검색 버튼 표시 */}
      <button
        type="submit"
        className="hidden sm:block border border-gray-300 rounded-md px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        검색
      </button>
    </form>
  );
};

export default CompSearchBar;
