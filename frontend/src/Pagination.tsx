interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }) => {
    return (
        <>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>Previous</button>
            {
                [...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onPageChange(index + 1)}
                        style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
                    >
                        {index + 1}
                    </button>
                ))
            }
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>
            <br />

            <br />

            <label>
                Results per page:
                <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </label>
        </>
    );
}

export default Pagination;