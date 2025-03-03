import { useNavigate } from "react-router-dom";
import CompNavBar from "../common/CompNavBar";

const MainPage = () => {
  const navigate = useNavigate(); // 페이지 이동 함수

  // 검색 버튼 클릭 시 SearchResults 페이지로 이동
  const btnHandlerSearch = () => {
    navigate("/searchresults");
  };

  // 현재 위치 검색 버튼 클릭 시 SearchResults 페이지로 이동
  const btnHandlerLocation = () => {
    navigate("/searchresults");
  };

  return (
    <div className="min-h-screen bg-gray-300">
      {/* 헤더 */}
      <CompNavBar />

      {/* 메인 컨텐츠 - 중앙 정렬 */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <h1 className="text-5xl font-bold mb-3 text-center">
          주변 약국을 <br /> 쉽고 빠르게 찾아보세요.
        </h1>

        {/* 설명 문구 - 한 줄 띄우기 */}
        <p className="text-sm text-gray-700 text-center w-3/5 leading-loose">
          약국명, 도로명 또는 동이름으로 검색할 수 있습니다. (예: 동명동,
          운암동, OO약국, 창식약국) <br />
          우측 돋보기를 눌러서 해당 약국 이동 후 지도를 확인하실 수 있습니다.
          (위치는 현재 위치 기준으로 검색됩니다.)
        </p>

        {/* 검색 박스 */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center w-[600px] mt-6">
          {/* 동 선택 드롭다운 */}
          <select className="border-none bg-transparent px-3 py-2 mr-2">
            <option>용산구 | 동 선택</option>
            <option>후암동</option>
            <option>남영동</option>
            <option>용산2가동</option>
            <option>청파동</option>
            <option>원효로1동</option>
            <option>원효로2동</option>
            <option>효창동</option>
            <option>용문동</option>
            <option>한강로동</option>
            <option>이촌1동</option>
            <option>이촌2동</option>
            <option>이태원1동</option>
            <option>이태원2동</option>
            <option>한남동</option>
            <option>서빙고동</option>
            <option>보광동</option>
          </select>

          {/* 검색 입력 필드 */}
          <input
            type="text"
            placeholder="동이름, 도로명, 또는 약국명을 검색해 주세요."
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-3 py-2"
          />

          {/* 검색 버튼 (search.png 아이콘 적용) */}
          <button
            className="ml-2 bg-teal-500 p-2 rounded-md"
            onClick={btnHandlerSearch}
          >
            <img src="/search.png" alt="검색 아이콘" className="w-5 h-5" />
          </button>
        </div>

        {/* 현재 위치에서 검색 버튼 */}
        <button
          className="mt-4 bg-white px-6 py-3 rounded-md shadow-md text-lg"
          onClick={btnHandlerLocation}
        >
          현재 위치에서 검색
        </button>
      </div>
    </div>
  );
};

export default MainPage;
