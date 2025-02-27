import React, { useEffect, useRef } from "react";
const { kakao } = window;
const CompKakaoMap = () => {
  const container = useRef(null);
  useEffect(() => {
    const position = new kakao.maps.LatLng(33.450701, 126.570667);
    const options = {
      center: position, //지도의 중심 좌표
      level: 3, //지도 확대 정도
    };
    const map = new kakao.maps.Map(container.current, options);
  }, []);
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  return (
    <div style={{ widht: "500px", height: "500px" }} ref={container}></div>
  );
};
//카카오맵 예제입니다.
export default CompKakaoMap;
