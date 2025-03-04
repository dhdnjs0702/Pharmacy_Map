import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabase/client";
import LikeButton from "../components/detail/CompLikeButton";
import CommentSection from "../components/detail/CompCommentSection";

const DetailPage = () => {
  const { pharm_id } = useParams(); // URL에서 약국 ID 가져오기
  const [pharmacy, setPharmacy] = useState(null); // 약국 데이터 상태
  const [error, setError] = useState(null); // 오류 상태

  useEffect(() => {
    if (!pharm_id) {
      console.error("pharm_id가 undefined입니다. API 요청 중단!");
      return;
    }

    // Supabase에서 약국 데이터 가져오기
    const fetchPharmacy = async () => {
      try {
        const { data, error } = await supabase
          .from("pharmacies")
          .select("*")
          .eq("pharm_id", pharm_id)
          .single();

        if (error) throw error;
        setPharmacy(data);
      } catch (error) {
        console.error("Supabase 데이터 가져오기 실패:", error.message);
        setError(error.message);
      }
    };

    fetchPharmacy();
  }, [pharm_id]);

  if (error) return <p className="text-red-500 text-center mt-4 text-xl">오류 발생: {error}</p>;
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
      {pharmacy?.pharm_id && <LikeButton pharm_id={pharmacy.pharm_id} />}

      {/* 댓글 섹션 */}
      <CommentSection />
    </div>
  );
};

export default DetailPage;