import { Map } from "react-kakao-maps-sdk";

const DetailPage = () => {
  //searchResults에서 props로 data를 가져와서 객체 접근 되겠습니다.

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
      }}
      level={3} // 지도의 확대 레벨
    />
  );
};
//카카오맵 예제입니다
export default DetailPage;
