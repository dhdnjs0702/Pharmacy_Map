import { useEffect, useState, useRef } from "react";
import "../KakaoMap.css";
import { Link } from "react-router-dom";

const KakaoMap = () => {
  // 상태 관리
  const [keyword, setKeyword] = useState(""); //검색 키워드
  const [places, setPlaces] = useState([]); //검색 결과
  const [pagination, setPagination] = useState(null); //페이지네이션

  // ref 객체 생성
  const mapContainer = useRef(null); //지도 생성 dom 객체
  const map = useRef(null); //지도
  const markers = useRef([]); //마커
  const infowindow = useRef(null); //마커 위에 올리면 뜨는 설명창
  const ps = useRef(null);

  // 컴포넌트 마운트 시 지도 초기화
  useEffect(() => {
    // 카카오맵 스크립트가 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      console.log("에러가 발생했습니다");
    }

    // 컴포넌트 언마운트 시 마커 제거
    return () => {
      if (markers.current.length > 0) {
        markers.current.forEach((marker) => {
          marker.setMap(null);
        });
      }
    };
  }, []);

  // 지도 초기화 함수
  const initializeMap = () => {
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567), //좌표설정
      level: 3, //확대 정도
    };

    // 지도 생성
    map.current = new window.kakao.maps.Map(mapContainer.current, mapOption);

    // 장소 검색 객체 생성
    ps.current = new window.kakao.maps.services.Places();

    // 인포윈도우 생성
    infowindow.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });
  };

  // 키워드 검색 함수
  const searchPlaces = () => {
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      //특수 문자나 공백 예외 처리
      alert("키워드를 입력해주세요!");
      return false;
    }

    ps.current.keywordSearch(keyword, placesSearchCB);
  };

  // 검색 콜백 함수
  const placesSearchCB = (data, status, pagination) => {
    console.log(data);
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(data);
      setPagination(pagination);
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
    }
  };

  console.log("pg", pagination);

  // 검색 결과 표시 함수
  const displayPlaces = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();

    // 기존 마커 제거
    removeMarker();

    places.forEach((place, i) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, i);

      bounds.extend(placePosition);

      // 마커에 이벤트 리스너 추가
      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        displayInfowindow(marker, place.place_name);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.current.close();
      });
    });

    // 검색된 장소 위치를 기준으로 지도 범위 재설정
    map.current.setBounds(bounds);
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

  // 인포윈도우 표시 함수
  const displayInfowindow = (marker, title) => {
    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;

    infowindow.current.setContent(content);
    infowindow.current.open(map.current, marker);
  };

  // 페이지네이션 처리 함수
  const handlePaginationClick = (i) => {
    pagination.gotoPage(i);
  };

  // 키워드 입력 처리
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // 검색 버튼 클릭 또는 엔터키 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    searchPlaces();
  };

  // 목록 항목 마우스 이벤트 처리
  const handleItemMouseOver = (place, i) => {
    const marker = markers.current[i];
    displayInfowindow(marker, place.place_name);
  };

  const handleItemMouseOut = () => {
    infowindow.current.close();
  };

  return (
    <div className="map_wrap">
      <div
        id="map"
        ref={mapContainer}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      ></div>

      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={keyword}
                id="keyword"
                onChange={handleKeywordChange}
                placeholder="키워드를 입력하세요"
              />
              <button type="submit">검색</button>
            </div>
          </form>
        </div>

        <ul id="placesList">
          {places.map((place, i) => (
            <Link
              key={i}
              to={`/detailpage?place_name=${place.place_name}&road_address_name=${place.road_address_name}`}
              onClick={() => {
                console.log(place);
              }}
            >
              <li
                key={i}
                className="item"
                onMouseOver={() => handleItemMouseOver(place, i)}
                onMouseOut={handleItemMouseOut}
              >
                <span className={`markerbg marker_${i + 1}`}></span>
                <div className="info">
                  <h5>{place.place_name}</h5>
                  {place.road_address_name ? (
                    <>
                      <span>{place.road_address_name}</span>
                      <span className="jibun gray">{place.address_name}</span>
                    </>
                  ) : (
                    <span>{place.address_name}</span>
                  )}
                  <span className="tel">{place.phone}</span>
                </div>
              </li>
            </Link>
          ))}
        </ul>

        <div id="pagination">
          {pagination &&
            Array.from({ length: pagination.last }, (_, i) => i + 1).map(
              (i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePaginationClick(i);
                  }}
                  className={i === pagination.current ? "on" : ""}
                >
                  {i}
                </a>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;
