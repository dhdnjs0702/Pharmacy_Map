import supabase from "../supabase/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LikeButton from "../components/detail/CompLikeButton";
import CommentSection from "../components/detail/CompCommentSection";

const DetailPage = () => {
  const { pharm_id } = useParams();
  const cleanedPharmId = pharm_id.replace(/^:/, "");

  const [pharmacy, setPharmacy] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const { data, error } = await supabase
          .from("pharmacies")
          .select("*")
          .eq("pharm_id", cleanedPharmId)
          .single();

        if (error) throw error;
        setPharmacy(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (cleanedPharmId) fetchPharmacy();
  }, [cleanedPharmId]);

  if (error) return <p className="text-red-500 text-center mt-4 text-xl">❌ 오류 발생: {error}</p>;
  if (!pharmacy) return <p className="text-gray-500 text-center mt-4 text-xl">🔍 약국 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      {/* 약국 이미지 (16:9 비율 유지) */}
      <div className="w-full aspect-[16/9] overflow-hidden rounded-lg">
        <img
          src={pharmacy.pharm_image || "/default-pharmacy-image.png"}
          alt={pharmacy.pharm_name || "기본 약국 이미지"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 약국 정보 */}
      <h2 className="text-2xl font-bold text-gray-900 mt-6">{pharmacy.pharm_name}</h2>
      <p className="text-lg text-gray-700 mt-3">📍 {pharmacy.pharm_address}</p>
      <p className="text-lg text-gray-700 mt-3">📞 {pharmacy.pharm_phonenum || "정보 없음"}</p>
      {/* 좋아요 버튼 */}
      <LikeButton />
      {/* 댓글 섹션 */}
      <CommentSection />
    </div>
  );
};

export default DetailPage;