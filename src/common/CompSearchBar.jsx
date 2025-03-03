import { useState } from 'react'

const CompSearchBar = () => {
  // 예시 동 목록 (실제 데이터는 API 또는 서버에서 받아올 수 있습니다)
  const dongList = [
    "후암동",
    "용산2가동",
    "남영동",
    "청파동",
    "원효로1동",
    "원효로2동",
    "효창동",
    "용문동",
    "한강로동",
    "이촌1동",
    "이촌2동",
    "이태원1동",
    "이태원2동",
    "한남동",
    "서빙고동",
    "보광동"
  ];
  const [selectedDong, setSelectedDong] = useState("용산구 동 선택");
  const [searchWord, setSearchWord] = useState("");

  // 공통 검색 실행 함수 추가
  const searchPlaces = () => {
    console.log("선택된 동:", selectedDong);
    console.log("검색어:", searchWord);
    // 원하는 API 호출 또는 페이지 이동 로직 추가
  }

  // "현재 위치로 검색" 버튼 클릭 시 실행할 로직
  const handleCurrentLocationSearch = () => {
    console.log("현재 위치로 검색 로직 실행");
    // 예: Geolocation API 등 활용
  };

  // 클릭 또는 엔터키 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    searchPlaces();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      {/* 동 선택 드롭다운 */}
      <div className="flex items-center space-x-3">
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
        {/* "현재 위치로 검색" 버튼 추가 */}
        <button
          type="button"
          onClick={handleCurrentLocationSearch}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700
          hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          현재 위치로 검색
        </button>

      </div>
      {/* 약국 검색 인풋 (가운데 정렬) */}
      <div className="flex justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="약국 검색"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            className="w-200 border border-gray-300 rounded-md px-3 py-2 pr-10
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg
            onClick={handleSubmit}
            className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform
                -translate-y-1/2 cursor-pointer"
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
      </div>
    </form>
  );
};

export default CompSearchBar;