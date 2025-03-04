import React, { useEffect, useState } from "react";
import supabase from "../supabase/client";

const MyPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("마이페이지");
  const [users, setUsers] = useState([]);
  const [nickName, setNickName] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("actions").select("*");
      if (error) {
        console.log("error => ", error);
      } else {
        console.log("data => ", data);
        setUsers(data);
      }
    };

    const getUserNick = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: userData, error } = await supabase
          .from("users")
          .select("user_nickname")
          .eq("user_id", user.id)
          .single();
        if (error) {
          console.log("error => ", error);
        } else {
          console.log("nickName => ", userData.user_nickname);
          setNickName(userData.user_nickname);
        }
      }
    };

    const getComments = async () => {
      const { data: comments, error } = await supabase
        .from("comments")
        .select("*")
        .eq("user_nickname", nickName);
      if (error) {
        console.log("error => ", error);
      } else {
        console.log("comments => ", comments);
        setComments(comments);
      }
    };

    fetchData();
    getUserNick();
    getComments();
  }, []);

  // 임시 데이터
  const bookmarks = ["북마크 1", "북마크 2", "북마크 3", "북마크 4"];

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
                {bookmark}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
