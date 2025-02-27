import supabase from "../supabase/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  
  if (error) return <p>오류 발생: {error}</p>;
  if (!pharmacy) return <p>정보 없음</p>;

  return (
    <div>
      <img src={pharmacy.pharm_image || "default.jpg"} alt={pharmacy.pharm_name} width="100%" />
      <h2>{pharmacy.pharm_name}</h2>
      <p>주소: {pharmacy.pharm_address}</p>
      <p>전화번호: {pharmacy.pharm_phonenum || "정보 없음"}</p>
    </div>
  );
};

export default DetailPage;