import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../KakaoMap.css";

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

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
      center: new window.kakao.maps.LatLng(37.5326, 126.9903),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    // 커스텀 마커 이미지 설정
    const imageSrc = "/images/pharmacy-marker.png"; 
    const imageSize = new window.kakao.maps.Size(40, 40);
    const imageOption = { offset: new window.kakao.maps.Point(20, 40) };
    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(37.5326, 126.9903),
      map,
      image: markerImage, // 커스텀 마커 이미지
    });
  }, [loaded]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
