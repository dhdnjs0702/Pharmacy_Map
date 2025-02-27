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
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(37.5665, 126.9780),
      map,
    });
  }, [loaded]);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
}