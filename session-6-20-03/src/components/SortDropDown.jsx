export default function SortDropDown({handleSort,value}) {
    return (
        <>
            <label htmlFor="sort">Sort by:</label>
            <select name="sort" id="sort" onChange={handleSort} value={value}>
                <option value=""></option>
                <option value="price-asc">Price-Low to High</option>
                <option value="price-desc">Price-High to Low</option>
            </select>
        </>
    );
}
