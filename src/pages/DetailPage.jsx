import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import supabase from "../supabase/client";
import LikeButton from "../components/detail/CompLikeButton";
import CommentSection from "../components/detail/CompCommentSection";

const DetailPage = () => {
  // 쿼리 스트링에서 pharm_id 받아오기
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pharm_id = params.get("pharm_id"); // 쿼리 스트링에서 pharm_id 받기

  const [pharmacy, setPharmacy] = useState(null); // 약국 데이터 상태

  useEffect(() => {
    if (!pharm_id) {
      console.error("쿼리스트링으로 pharm_id 못 받아옴!");
      return;
    }

    // Supabase에서 약국 데이터 가져오기
    const fetchPharmacy = async () => {
      try {
        const { data } = await supabase
          .from("pharmacies")
          .select("*")
          .eq("pharm_id", pharm_id)
          .single();

        if (!data) {
          console.warn("약국 데이터 없음.");
          return;
        }

        setPharmacy(data);
      } catch (error) {
        console.error("Supabase 연동 실패:", error.message);
      }
    };

    fetchPharmacy();
  }, [pharm_id]);

  if (!pharmacy) return <p className="text-gray-500 text-center mt-4 text-xl">약국 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      {/* 약국 이미지 (16:9 비율 유지) */}
      <div className="w-full aspect-[16/9] overflow-hidden rounded-lg">
        <img
          src={pharmacy.pharm_image || "/default-pharmacy-image.png"} // 기본 이미지 적용
          alt={pharmacy.pharm_name || "기본 약국 이미지"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 약국 정보 표시 */}
      <h2 className="text-2xl font-bold text-gray-900 mt-6">{pharmacy.pharm_name}</h2>
      <p className="text-lg text-gray-700 mt-3">📍 {pharmacy.pharm_address}</p>

      {/* pharm_id가 존재할 때만 좋아요 버튼 렌더링 */}
      {pharm_id && <LikeButton pharm_id={pharm_id} />}

      {/* 댓글 섹션 */}
      <CommentSection />
    </div>
  );
};

export default DetailPage;