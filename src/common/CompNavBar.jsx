import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
import Swal from "sweetalert2";
import { useKakaoStore } from "../zustand/dragon";

const CompNavBar = ({ currentLocation }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setUserId, userid } = useKakaoStore();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // 로그아웃 버튼 클릭 시 (로그인 상태 변경)
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut(); //notice: merge후 로그아웃 처리 되는지 체크해봐야함
      if (error) throw error;

      navigate("/");
    } catch (error) {
      console.log("로그아웃 오류", error);
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        Swal.fire({
          title: "앗!",
          text: "성공적으로 로그아웃되었습니다.",
          icon: "warning",
          confirmButtonText: "확인",
          confirmButtonColor: "#3085D6",
        });
        navigate("/");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error("유저 정보 가져오기 실패:", error.message);
      } else {
        setUserId(user.user.id);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center relative z-50">
      {/* 로고 (메인 페이지 이동) */}
      <Link to="/mainpage">
        <img src="/logo.png" alt="로고" className="w-20 h-auto" />
      </Link>

      {/*  위치 기준 & 버튼 그룹 */}
      <div className="flex items-center space-x-6">
        {/*  동적으로 위치 기준 표시 */}
        <div className="text-sm text-gray-600">
          위치 기준: <span className="text-blue-500">{currentLocation}</span>
        </div>

        {/* 로그인 전 버튼 (로그인 & 회원가입) */}
        {!userid && (
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
        {userid && (
          <div className="relative flex items-center gap-2">
            {/* 마이페이지 버튼 */}
            <button
              className="bg-gray-200 px-4 py-2 w-32 rounded-md hover:bg-gray-300 transition duration-200"
              onClick={toggleDropdown}
            >
              마이페이지
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-32 bg-white shadow-md rounded-md border border-gray-300 z-50">
                <Link to="/mypage">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition duration-200">
                    마이페이지
                  </button>
                </Link>
              </div>
            )}

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
