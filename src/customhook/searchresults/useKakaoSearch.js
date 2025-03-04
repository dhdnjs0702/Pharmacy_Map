import Swal from "sweetalert2";
import supabase from "../../supabase/client";
import { useKakaoStore } from "../../zustand/dragon";

const useKakaoSearch = () => {
  const { pagination, error, setLoading, setPlaces, setPagination, setError } =
    useKakaoStore();

  const searchPharmacies = async (keyword) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("pharmacies")
        .select("*")
        .ilike("pharm_name", `%${keyword}%`);

      if (error) throw error;

      if (data.length > 0) {
        getPlacesWithCoordinates(data);
      } else {
        Swal.fire({
          title: "앗!",
          text: "검색 결과가 존재하지 않습니다. 다른 이름의 약국을 검색해주세요",
          icon: "question",
          confirmButtonText: "확인",
          confirmButtonColor: "#3085d6",
        });
        setPlaces([]);
        setPagination(null);
      }
    } catch (error) {
      console.error("검색 오류:", error);
      setError("검색 중 오류가 발생했습니다.");
      setPlaces([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const getPlacesWithCoordinates = (pharmacies) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const geocodingPromises = pharmacies.map((pharm) => {
      return new Promise((resolve) => {
        geocoder.addressSearch(pharm.pharm_address || "", (result, status) => {
          if (status === window.kakao.maps.services.Status.OK && result[0]) {
            resolve({
              ...pharm,
              place_name: pharm.pharm_name,
              address_name: pharm.pharm_address || "",
              road_address_name: pharm.pharm_address || "",
              x: result[0].x,
              y: result[0].y,
              phone: pharm.pharm_phonenum || "",
            });
          } else {
            console.log("주소 정보 변환 실패:", pharm.pharm_address);
            resolve({
              ...pharm,
              place_name: pharm.pharm_name,
              address_name: pharm.pharm_address || "",
              road_address_name: pharm.pharm_address || "",
              x: null,
              y: null,
              phone: pharm.pharm_phonenum || "",
            });
          }
        });
      });
    });

    Promise.all(geocodingPromises).then((placesWithCoords) => {
      makePagination(placesWithCoords);
    });
  };

  const makePagination = (allPlaces) => {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(allPlaces.length / itemsPerPage);

    const paginationObj = {
      current: 1,
      last: totalPages,
      gotoPage: (pageNum) => {
        const start = (pageNum - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, allPlaces.length);
        const pageItems = allPlaces.slice(start, end);

        setPlaces(pageItems);

        setPagination({
          ...paginationObj,
          current: pageNum,
        });
      },
    };

    setPagination(paginationObj);

    paginationObj.gotoPage(1);
  };

  return {
    error,
    searchPharmacies,
    handlePaginationClick: (page) => pagination && pagination.gotoPage(page),
  };
};

export default useKakaoSearch;
