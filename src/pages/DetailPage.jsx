import Supabase from "../supabase/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { pharm_id } = useParams();
  const [pharmacy, setParmacy] = useState(null);

  useEffect(() => {
    Supabase
      .from("pharmacys")
      .select("*")
      .eq("pharm_id", pharm_id)
      .single()
      .then(({data}) => setParmacy(data));
  }, [pharm_id]);

  if (!pharmacy) return <p>정보 없음</p>

  return (
    <div>
      <img src={pharmacy.pharm_image} alt={pharmacy.pharm_name} width="100%" />
      <h2>{pharmacy.pharm_name}</h2>
      <p>주소: {pharmacy.pharm_address}</p>
      <p>전화번호: {pharmacy.pharm_phonenum}</p>
    </div>
  );
};
//카카오맵 예제입니다
export default DetailPage;
