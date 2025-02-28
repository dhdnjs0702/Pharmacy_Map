const CommentSection = () => {
    return (
        <div className="p-4 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold mb-2">💬 댓글</h2>
            <input
                type="text"
                placeholder="댓글을 입력하세요..."
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                등록
            </button>
        </div>
    );
};

export default CommentSection;