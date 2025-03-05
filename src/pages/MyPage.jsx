import { useEffect, useState } from "react";
import supabase from "../supabase/client";

const MyPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("마이페이지");
  const [user, setUser] = useState("");
  const [comments, setComments] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: userData, error } = await supabase
            .from("users")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (error) {
            console.log("users table error => ", error);
          } else if (userData) {
            setUser(userData);

            // 사용자 데이터를 가져온 후 댓글과 북마크 가져오기
            getComments(userData.user_id);
            getBookmarks(userData.user_id);
          }
        }
      } catch (error) {
        console.log("Unexpected error => ", error);
      }
    };

    const getComments = async (userId) => {
      if (userId) {
        const { data: comments, error } = await supabase
          .from("comments")
          .select("*")
          .eq("user_id", userId);

        if (error) {
          console.log("comments error => ", error);
        } else {
          setComments(comments);
        }
      }
    };

    const getBookmarks = async (userId) => {
      if (userId) {
        const { data: bookmarkData, error } = await supabase
          .from("actions")
          .select("created_at, pharm_id")
          .eq("user_id", userId);

        if (error) {
          console.log("bookmarks error => ", error);
          return;
        }

        // 추가로 약국 정보 가져오기
        const pharmIds = bookmarkData.map((bookmark) => bookmark.pharm_id);
        const { data: pharmData, error: pharmError } = await supabase
          .from("pharmacies")
          .select("pharm_id, pharm_name")
          .in("pharm_id", pharmIds);

        if (pharmError) {
          console.log("pharmacy error => ", pharmError);
          return;
        }

        // 데이터 병합 (안전한 방식)
        const mergedBookmarks = bookmarkData.map((bookmark) => {
          const pharmacy = pharmData.find(
            (p) => p.pharm_id === bookmark.pharm_id
          );
          return {
            ...bookmark,
            pharm_name: pharmacy ? pharmacy.pharm_name : "알 수 없는 약국",
          };
        });

        setBookmarks(mergedBookmarks);
      }
    };

    getUserId();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMenu = (menu) => {
    setActiveMenu(menu);
    setDropdownOpen(false);
  };

  return (
    <div>
      <header className="bg-green-500 p-4">
        <div className="flex justify-end">
          <button
            className="bg-white p-2 rounded w-40"
            onClick={toggleDropdown}
          >
            {activeMenu}
          </button>
          {dropdownOpen && (
            <div className="absolute bg-white shadow-md mt-1 rounded">
              <button
                className="block p-2 hover:bg-gray-200 w-40"
                onClick={() => handleMenu("마이페이지")}
              >
                마이페이지
              </button>
              <button
                className="block p-2 hover:bg-gray-200 w-40"
                onClick={() => handleMenu("리뷰")}
              >
                리뷰
              </button>
              <button
                className="block p-2 hover:bg-gray-200 w-40"
                onClick={() => handleMenu("북마크")}
              >
                북마크
              </button>
            </div>
          )}
        </div>
      </header>
      <div>
        {activeMenu === "마이페이지" && (
          <div className="flex justify-center items-center h-screen">
            마이페이지
          </div>
        )}
        {activeMenu === "리뷰" && (
          <div className="grid grid-cols-4 gap-4 p-4">
            {comments.map((comment) => (
              <div
                key={comment.comment_id}
                className="border rounded p-4 shadow-md"
              >
                {comment.content}
              </div>
            ))}
          </div>
        )}
        {activeMenu === "북마크" && (
          <div className="grid grid-cols-4 gap-4 p-4">
            {bookmarks.map((bookmark, index) => (
              <div key={index} className="border rounded p-4 shadow-md">
                {bookmark.pharm_name}
                <div className="text-sm text-gray-500">
                  {new Date(bookmark.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
