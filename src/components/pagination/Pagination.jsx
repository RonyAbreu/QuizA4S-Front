import "./Pagination.css";
import { useEffect, useState } from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    setIsFirstPage(currentPage === 0);
    setIsLastPage(currentPage === totalPages - 1);
  }, [currentPage, totalPages]);

  function alterPage(direction) {
    if (direction === "prev" && !isFirstPage) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && !isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="container-pagination">
      <button
        type="button"
        onClick={() => alterPage("prev")}
        disabled={isFirstPage}
      >
        Anterior
      </button>
      <button
        type="button"
        onClick={() => alterPage("next")}
        disabled={isLastPage || currentPage === totalPages -1}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
