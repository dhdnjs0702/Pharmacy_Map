import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import supabase from "../../supabase/client";

const LikeButton = ({ pharm_id }) => {
    const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
    const [user_id, setUserId] = useState(null); // 로그인한 사용자 ID

    useEffect(() => {
        // 현재 로그인한 사용자 ID 가져오기
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) return; // 에러 발생 시 종료
            setUserId(user.id); // 로그인된 사용자의 ID 설정
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (!pharm_id || !user_id) return; // 필수 데이터가 없으면 실행하지 않음

        // 사용자가 해당 약국을 좋아요 했는지 확인하는 함수
        const checkLike = async () => {
            try {
                const { data } = await supabase
                    .from("actions") 
                    .select("action_id")
                    .eq("pharm_id", pharm_id) // 특정 약국에 대한 좋아요 데이터 조회
                    .eq("user_id", user_id) // 현재 로그인한 사용자 ID와 매칭되는 데이터 조회
                    .single();

                if (data) setIsLiked(true); // 좋아요가 존재하면 상태 업데이트
            } catch (error) {
                console.error("좋아요 상태 조회 실패:", error.message);
            }
        };

        checkLike();
    }, [pharm_id, user_id]);

    // 좋아요 버튼 클릭 핸들러
    const likeBtnHandler = async () => {
        if (!user_id) {
            alert("로그인이 필요합니다."); // 로그인하지 않은 사용자는 좋아요 불가
            return;
        }

        setIsLiked((prev) => !prev); // UI 상태 먼저 변경 (낙관적 업데이트)

        try {
            if (isLiked) {
                // 좋아요 취소
                await supabase
                    .from("actions")
                    .delete()
                    .eq("pharm_id", pharm_id)
                    .eq("user_id", user_id);
            } else {
                // 좋아요 추가
                await supabase.from("actions").insert([
                    { pharm_id, user_id, created_at: new Date() }
                ]);
            }
        } catch (error) {
            console.error("좋아요 처리 실패:", error.message);
            setIsLiked((prev) => !prev); // 오류 발생 시 원래 상태로 되돌리기
        }
    };

    return (
        <button 
            onClick={likeBtnHandler} 
            className="px-4 py-2 border border-gray-300 rounded-md"
        >
            {isLiked ? "❤️" : "🤍"} {/* 좋아요 상태에 따라 아이콘 변경 */}
        </button>
    );
};

LikeButton.propTypes = {
    pharm_id: PropTypes.string.isRequired, // pharm_id 필수값 설정
};

export default LikeButton;