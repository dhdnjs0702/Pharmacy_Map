import { useEffect, useState } from "react";

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY; // .env.local에서 API 키 가져오기

export default function KakaoMap() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => setLoaded(true));
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const container = document.getElementById("map");
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.5326, 126.9903), //중심 좌표(용산 구청으로 했습니다)
      level: 3, //지도  확대 레벨
    };

    const map = new window.kakao.maps.Map(container, options);

    //중심 좌표에 마커 추가 예시
    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(37.5326, 126.9903),
      map,
    });
  }, [loaded]);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
}