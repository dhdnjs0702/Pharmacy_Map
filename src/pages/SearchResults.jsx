import { useEffect } from "react";
import "../KakaoMap.css";
import Swal from "sweetalert2";
import CompMap from "../components/searchresults/CompMap";
import CompSearchBar from "../common/CompSearchBar";
import CompList from "../components/searchresults/CompList";
import CompPagination from "../components/searchresults/CompPagination";
import useKakaoSearch from "../customhook/searchresults/useKakaoSearch";
import CompNavBar from "../common/CompNavBar";
import { useKakaoStore } from "../zustand/dragon";

const SearchResults = () => {
  const { error, searchPharmacies, handlePaginationClick } = useKakaoSearch();
  const { isLoading } = useKakaoStore();
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "에러",
        text: "에러가 발생했습니다. 관리자에게 문의 해주세요",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      });
    }
  }, [error]);

  return (
    <>
      <CompNavBar />
      <div className="map_wrap">
        <CompMap />

        <div id="menu_wrap" className="bg_white">
          <CompSearchBar onSearch={searchPharmacies} />

          {isLoading ? (
            <div className="loading">검색 중...</div>
          ) : (
            <>
              <CompList /> {/*디테일 페이지는 complist에서 쿼리 스트링 참조*/}
              <CompPagination onPageChange={handlePaginationClick} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
