import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import supabase from "../../supabase/client";

const CommentSection = ({ pharm_id }) => {
    const [comments, setComments] = useState([]); // 댓글 목록 상태
    const [newComment, setNewComment] = useState(""); // 입력 필드 상태
    const [user_id, setUserId] = useState(null); // 로그인된 사용자 ID

    useEffect(() => {
        // 로그인한 사용자 정보 가져오기
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) return;
            setUserId(user.id);
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (!pharm_id) return;

        // Supabase에서 특정 약국에 대한 댓글 불러오기
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from("comments")
                .select("*")
                .eq("pharm_id", pharm_id)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("댓글 가져오기 실패:", error.message);
                return;
            }

            setComments(data);
        };

        fetchComments();
    }, [pharm_id]);

    // 댓글 등록 핸들러
    const handleAddComment = async () => {
        if (!user_id) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (!newComment.trim()) {
            alert("댓글을 입력하세요.");
            return;
        }

        try {
            const { error } = await supabase
                .from("comments")
                .insert([{ pharm_id, user_id, content: newComment, created_at: new Date() }]);

            if (error) throw error;

            setNewComment(""); // 입력 필드 초기화
            setComments([{ pharm_id, user_id, content: newComment, created_at: new Date() }, ...comments]);
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
                            <p className="text-gray-700">{comment.content}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">아직 댓글이 없습니다.</p>
                )}
            </div>

            {/* 댓글 입력 및 등록 버튼 */}
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
                onClick={handleAddComment}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                등록
            </button>
        </div>
    );
};

CommentSection.propTypes = {
    pharm_id: PropTypes.string.isRequired,
};

export default CommentSection;