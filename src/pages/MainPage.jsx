import { useNavigate } from "react-router-dom";
import CompNavBar from "../common/CompNavBar";
import { useKakaoStore } from "../zustand/dragon";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useKakaoSearch from "../customhook/searchresults/useKakaoSearch";
import supabase from "../supabase/client"; //  Supabase 추가

const MainPage = () => {
  const navigate = useNavigate(); // 페이지 이동 함수
  const { keyword, setKeyword } = useKakaoStore();
  const { error, searchPharmacies } = useKakaoSearch();
  const [ currentLocation, setCurrentLocation ] = useState(); 
  const [user, setUser] = useState(null); //  로그인된 사용자 상태 추가

  //  로그인 여부 확인
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        Swal.fire({
          title: "에러",
          text: "에러가 발생했습니다. 관리자에게 문의 해주세요",
          icon: "error",
          confirmButtonText: "확인",
          confirmButtonColor: "#3085D6",
        });
        navigate("/"); // 로그인 페이지로 이동
      } else {
        setUser(data.user);
      }
    };
    checkUser();
  }, [navigate]);

  //  현재 위치 가져오기 함수
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      setCurrentLocation("위치 정보를 가져올 수 없습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (!window.kakao || !window.kakao.maps) {
          setCurrentLocation("카카오 맵 API를 로드할 수 없습니다.");
          return;
        }

        //  Kakao 지도 API의 Geocoder를 사용하여 주소 변환
        const geocoder = new window.kakao.maps.services.Geocoder();
        const coord = new window.kakao.maps.LatLng(latitude, longitude);

        geocoder.coord2RegionCode(longitude, latitude, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const region = result.find((r) => r.region_type === "H"); // 'H'는 동 단위
            setCurrentLocation(
              region
                ? `${region.address_name}`
                : "위치 정보를 찾을 수 없습니다."
            );
          } else {
            setCurrentLocation("위치 정보를 가져오는 중 오류가 발생했습니다.");
          }
        });
      },
      (error) => {
        console.error("Geolocation Error:", error);
        setCurrentLocation("위치 정보를 가져올 수 없습니다.");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 } // 옵션 추가
    );
  };

  //  페이지가 처음 로드될 때 로그인 상태 및 위치 가져오기
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  //  검색 제출 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      Swal.fire({
        title: "앗!",
        text: "키워드를 입력해주세요",
        icon: "question",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      await searchPharmacies(keyword); // 비동기 함수 실행 후 페이지 이동
      navigate("/searchresults");
    } catch (err) {
      Swal.fire({
        title: "에러",
        text: "검색 중 문제가 발생했습니다. 다시 시도해주세요.",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085D6",
      });
    }
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "에러",
        text: "에러가 발생했습니다. 관리자에게 문의 해주세요",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085D6",
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col">
      {/* 헤더 */}
      <CompNavBar currentLocation = {currentLocation}/>

      {/* 메인 컨텐츠 - 중앙 정렬 */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-5xl font-bold mb-5 text-center max-w-[600px] leading-tight">
          주변 약국을 쉽고
          <br /> 빠르게 찾아보세요.
        </h1>

        {/* 설명 문구 */}
        <p className="text-base text-gray-700 text-center max-w-[700px] leading-relaxed mb-6">
          약국명, 도로명 또는 동이름으로 검색할 수 있습니다. (예: 동명동,
          운암동, OO약국, 창식약국) <br />
          우측 돋보기를 눌러서 해당 약국 이동 후 지도를 확인하실 수 있습니다.
          <br />
          (위치는 현재 위치 기준으로 검색됩니다.)
        </p>

        {/*  검색 폼 */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow-md flex w-[500px]"
        >
          {/* 검색 입력 필드 */}
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            placeholder="동이름, 도로명, 또는 약국명을 검색해 주세요."
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-4 py-2"
          />

          {/*  검색 버튼 (search.png 아이콘 적용) */}
          <button
            type="submit"
            className="bg-teal-500 p-3 rounded-md flex items-center justify-center"
          >
            <img src="/search.png" alt="검색 아이콘" className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainPage;
