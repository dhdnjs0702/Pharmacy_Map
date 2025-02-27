import pharmacyData from "../data/filtered_pharmacy_info.json";
import { v4 as uuidv4 } from "uuid";
import supabase from "../supabase/client";

export const uploadPharmacies = async () => {
  try {
    const formattedData = pharmacyData.map((item) => ({
      pharm_id: uuidv4(),
      pharm_image: null,
      pharm_name: item["약국이름"],
      pharm_address: item["주소"],
      pharm_phonenum: item["전화번호"] || null,
    }));

    console.log(formattedData);

    const { data, error } = await supabase
      .from("pharmacies")
      .insert(formattedData);

    if (error) throw error;
    console.log("✅ 약국 데이터 업로드 성공:", data);
  } catch (error) {
    console.error("❌ 데이터 업로드 실패:", error.message);
  }
};
