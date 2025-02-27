import { useState } from "react";

export default function AddMapClickEvent() {
  const [result, setResult] = useState("");

  const mapClickHandler = (_, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    setResult(
      `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`
    );
  };

  return { result, mapClickHandler };
}
