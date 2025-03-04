import { useKakaoStore } from "../../zustand/dragon";

const CompPagination = ({ onPageChange }) => {
  const { pagination } = useKakaoStore();
  if (!pagination) return null;

  return (
    <div id="pagination">
      {Array.from({ length: pagination.last }, (_, i) => i + 1).map((i) => (
        <a
          key={i}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(i);
          }}
          className={i === pagination.current ? "on" : ""}
        >
          {i}
        </a>
      ))}
    </div>
  );
};

export default CompPagination;