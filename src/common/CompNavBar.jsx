import { useState } from "react";
import { Link } from "react-router-dom"; // React Router 추가
import { useUserStore } from "../zustand/dragon"; // Zustand 상태 관리

const CompNavBar = () => {
  const { isLoginMode, setIsLoginMode } = useUserStore(); // 로그인 상태 가져오기
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // 로그인 버튼 클릭 시 (로그인 상태 변경)
  const handleLogin = () => {
    setIsLoginMode(true); // 로그인 상태로 변경
  };

  // 로그아웃 버튼 클릭 시 (로그인 상태 변경)
  const handleLogout = () => {
    setIsLoginMode(false); // 로그아웃 상태로 변경
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center relative z-50">
      {/* 로고 (메인 페이지 이동) */}
      <Link to="/">
        <img src="/logo.png" alt="로고" className="w-20 h-auto" />
      </Link>

      {/* 위치 기준 + 버튼 그룹 */}
      <div className="flex items-center space-x-4 relative">
        {/* 위치 정보 */}
        <div className="text-sm text-gray-600">
          위치 기준: <span className="text-blue-500">광주광역시 북구 운암동</span>
        </div>

        {/* 로그인 전 버튼 (로그인 & 회원가입) */}
        {!isLoginMode && (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <button className="bg-gray-200 px-4 py-2 w-32 rounded-md hover:bg-gray-300 transition duration-200">
                로그인
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-gray-200 px-4 py-2 w-32 rounded-md hover:bg-gray-300 transition duration-200">
                회원가입
              </button>
            </Link>
          </div>
        )}

        {/* 로그인 후 버튼 (마이페이지 & 로그아웃) */}
        {isLoginMode && (
          <div className="relative flex items-center gap-2">
            {/* 마이페이지 버튼 */}
            <button
              className="bg-gray-200 px-4 py-2 w-32 rounded-md hover:bg-gray-300 transition duration-200"
              onClick={toggleDropdown}
            >
              마이페이지
            </button>

            {/* 드롭다운 메뉴 - 버튼 아래 표시 */}
            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-32 bg-white shadow-md rounded-md border border-gray-300 z-50">
                <Link to="/mypage">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition duration-200">
                    마이페이지
                  </button>
                </Link>
                <Link to="/review">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition duration-200">
                    리뷰
                  </button>
                </Link>
                <Link to="/bookmark">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition duration-200">
                    북마크
                  </button>
                </Link>
              </div>
            )}

            {/* 로그아웃 버튼 */}
            <button
              className="bg-gray-200 px-4 py-2 w-32 rounded-md hover:bg-gray-300 transition duration-200"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default CompNavBar;
