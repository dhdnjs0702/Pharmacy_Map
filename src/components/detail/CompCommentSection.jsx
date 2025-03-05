import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import supabase from "../../supabase/client";
import Swal from "sweetalert2";
const CommentSection = ({ pharm_id }) => {
  // 댓글 목록 상태
  const [comments, setComments] = useState([]);
  // 입력 필드 상태
  const [newComment, setNewComment] = useState("");
  // 로그인된 사용자 정보 (ID, 닉네임)
  const [user, setUser] = useState(null);

  // 현재 로그인한 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserHandler = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) return;

      // `users` 테이블에서 `user_nickname` 가져오기
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("user_nickname")
        .eq("user_id", user.id)
        .single();

      if (userError) return;

      // 사용자 정보 상태 업데이트
      setUser({ id: user.id, nickname: userData?.user_nickname || "익명" });
    };

    fetchUserHandler();
  }, []);

  // 특정 약국의 댓글 목록 가져오기
  useEffect(() => {
    if (!pharm_id) return;

    const fetchCommentsHandler = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("content, created_at, user_id, user_nickname")
        .eq("pharm_id", pharm_id)
        .order("created_at", { ascending: false });

      if (!error) setComments(data);
    };

    fetchCommentsHandler();
  }, [pharm_id]);

  // 댓글 등록 핸들러
  const addCommentHandler = async () => {
    if (!user) {
      Swal.fire({
        title: "앗!",
        text: " 로그인인 필요합니다",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (!newComment.trim()) {
      Swal.fire({
        title: "앗!",
        text: "댓글을 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      // Supabase에 댓글 추가
      const { error } = await supabase.from("comments").insert([
        {
          pharm_id,
          user_id: user.id,
          user_nickname: user.nickname, // 닉네임 함께 저장
          content: newComment,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      // UI 업데이트 (새 댓글을 리스트 최상단에 추가)
      setNewComment("");
      setComments([
        {
          pharm_id,
          user_id: user.id,
          user_nickname: user.nickname,
          content: newComment,
          created_at: new Date().toISOString(),
        },
        ...comments,
      ]);
    } catch (error) {
      console.error("댓글 등록 실패:", error.message);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      {/* 댓글 목록 */}
      <h2 className="text-lg font-semibold mb-2">댓글</h2>
      <div className="mb-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="p-2 border-b border-gray-200">
              {/* 닉네임 및 댓글 내용 표시 */}
              <p className="text-sm font-semibold text-gray-800">
                {comment.user_nickname || "익명"}
              </p>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">아직 댓글이 없습니다.</p>
        )}
      </div>

      {/* 댓글 입력 및 등록 버튼 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={addCommentHandler}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          등록
        </button>
      </div>
    </div>
  );
};

// `pharm_id`는 필수 props로 설정
CommentSection.propTypes = {
  pharm_id: PropTypes.string.isRequired,
};
export default CommentSection;
