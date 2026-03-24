export default function Pagination({currentPage,setCurrentPage,totalPages}) {
    return (
        <>
            <span>
                <button
                    disabled={currentPage === 1}
                    onClick={() => {
                        const page = Math.max(currentPage - 1, 1);
                        setCurrentPage(page);
                    }}>
                    Prev
                </button>
            </span>

            <span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                        const page = Math.min(currentPage + 1, totalPages);
                        setCurrentPage(page);
                    }}>
                    Next
                </button>
            </span>
        </>
    );
}
