import { useEffect, useRef } from "react";
import { useKakaoStore } from "../../zustand/dragon";

const CompMap = () => {
  const { places } = useKakaoStore();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.529128500148, 126.9654885873),
      level: 3,
    };

    if (window.kakao && window.kakao.maps) {
      map.current = new window.kakao.maps.Map(mapContainer.current, mapOption);
    } else {
      console.log("카카오맵 로드 실패");
    }

    return () => {
      if (markers.current.length > 0) {
        markers.current.forEach((marker) => {
          marker.setMap(null);
        });
      }
    };
  }, []);

  // places가 변경될 때마다 지도에 표시
  useEffect(() => {
    if (places && places.length > 0) {
      displayPlaces(places);
    }
  }, [places]);

  // 검색 결과 표시 함수
  const displayPlaces = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    let hasValidPlaces = false;

    // 기존 마커 제거
    removeMarker();

    places.forEach((place, i) => {
      // 좌표가 있는 경우에만 마커 표시
      if (place.y && place.x) {
        const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
        addMarker(placePosition, i);
        bounds.extend(placePosition);
        hasValidPlaces = true;
      }
    });

    // 유효한 장소가 있는 경우에만 지도 범위 조정
    if (hasValidPlaces) {
      map.current.setBounds(bounds);
    }
  };

  // 마커 생성 함수
  const addMarker = (position, idx) => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new window.kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new window.kakao.maps.Size(36, 691),
      spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
      offset: new window.kakao.maps.Point(13, 37),
    };

    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );
    const marker = new window.kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

    marker.setMap(map.current);
    markers.current.push(marker);

    return marker;
  };

  // 마커 제거 함수
  const removeMarker = () => {
    markers.current.forEach((marker) => {
      marker.setMap(null);
    });
    markers.current = [];
  };

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default CompMap;
