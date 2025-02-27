import { Map } from "react-kakao-maps-sdk";
import AddMapClickEvent from "../customhook/searchresults/searchresultshooks";

const SearchResults = () => {
  const { result, mapClickHandler } = AddMapClickEvent();
  return (
    <>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 37.521989659684756,
          lng: 126.97453040112002, //이촌역 기준
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={2} // 지도의 확대 레벨
        onClick={mapClickHandler}
      />
      <p>
        <em>지도를 클릭해주세요!</em>
      </p>
      <p id="result">{result}</p>
    </>
  );
};

export default SearchResults;
