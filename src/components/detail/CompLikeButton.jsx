import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import supabase from "../../supabase/client";

const BookmarkButton = ({ pharm_id }) => {
    const [isBookmarked, setIsBookmarked] = useState(false); // 북마크 상태
    const [user_id, setUserId] = useState(null); // 로그인한 사용자 ID

    // 현재 로그인한 사용자 ID 가져오기
    useEffect(() => {
        const fetchUserHandler = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) return;
            setUserId(user.id);
        };

        fetchUserHandler();
    }, []);

    // 사용자가 특정 약국을 북마크했는지 확인
    useEffect(() => {
        if (!pharm_id || !user_id) return;

        const checkBookmarkHandler = async () => {
            try {
                const { data, error } = await supabase
                    .from("actions")
                    .select("action_id")
                    .eq("pharm_id", pharm_id)
                    .eq("user_id", user_id)
                    .maybeSingle(); // 데이터가 없으면 null 반환

                if (error) throw error;

                setIsBookmarked(!!data); // 데이터가 있으면 true, 없으면 false
            } catch (error) {
                console.error("북마크 상태 조회 실패:", error.message);
            }
        };

        checkBookmarkHandler();
    }, [pharm_id, user_id]);

    // 북마크 버튼 클릭 핸들러
    const toggleBookmarkHandler = async () => {
        if (!user_id) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            if (isBookmarked) {
                // 북마크 취소
                const { error } = await supabase
                    .from("actions")
                    .delete()
                    .eq("pharm_id", pharm_id)
                    .eq("user_id", user_id);

                if (error) throw error;

                setIsBookmarked(false);
            } else {
                // 북마크 추가
                const { error } = await supabase
                    .from("actions")
                    .insert([{ pharm_id, user_id, created_at: new Date().toISOString() }]);

                if (error) throw error;

                setIsBookmarked(true);
            }
        } catch (error) {
            console.error("북마크 처리 실패:", error.message);
        }
    };

    return (
        <button 
            onClick={toggleBookmarkHandler} 
            className={`flex items-center gap-2 px-4 py-2 text-lg font-semibold rounded-md transition-all duration-200 ${
                isBookmarked 
                    ? "bg-blue-100 text-blue-600 border border-blue-400 shadow-sm" 
                    : "bg-gray-200 text-gray-600 border border-gray-400 hover:bg-gray-300"
            }`}
        >
            {isBookmarked ? "🔖" : "🏷️"}
            {isBookmarked ? "북마크 완료" : "북마크 하기"}
        </button>
    );
};

BookmarkButton.propTypes = {
    pharm_id: PropTypes.string.isRequired, // pharm_id 필수값 설정
};

export default BookmarkButton;