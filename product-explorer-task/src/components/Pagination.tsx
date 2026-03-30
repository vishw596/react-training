import { useFilter } from "../context/useFilter";

export type PaginationProps = {
    totalProducts: number;
};

export default function Pagination({ totalProducts }: PaginationProps) {
    const { currentPage, handlePageUpdate, urlOptions } = useFilter()
    const totalPages = Math.ceil((totalProducts ?? 0) / urlOptions.limit);

    return (
        <>
            {totalPages > 0 && (
                <>
                    <span>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => {
                                const page = Math.max(currentPage - 1, 1);
                                handlePageUpdate(page);
                            }}>
                            Prev
                        </button>
                    </span>

                    <span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => {
                                const page = Math.min(currentPage + 1, totalPages);
                                handlePageUpdate(page);
                            }}>
                            Next
                        </button>
                    </span>
                </>
            )}
            {totalPages <= 0 && <div>No products found</div>}
        </>
    );
}
