import { uploadPharmacies } from "../utils/uploadPharmacy";

const AdminPage = () => {
  return (
    <div>
      <h1>Supabase 데이터 업로드</h1>
      <button onClick={uploadPharmacies}>약국 데이터 업로드</button>
    </div>
  );
};
//json데이터를 슈퍼베이스에 업로드 하기위한 부분
export default AdminPage;
