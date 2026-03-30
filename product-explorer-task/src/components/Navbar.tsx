import useCart from "../context/useCart";
import { useFilter } from "../context/useFilter";
import type { OptionType } from "./DropDown";
import DropDown from "./DropDown";

export default function Navbar() {
    const sortOptions: OptionType = [
        { value: "price-asc", optionTitle: "Price-Low to High" },
        { value: "price-desc", optionTitle: "Price-High to Low" },
        { value: "rating-asc", optionTitle: "Rating-Low to High" },
        { value: "rating-desc", optionTitle: "Rating-High to Low" },
    ];
    const { onChangeHandlerInput, input, categoryList, handleCategory, urlOptions, handleSearch, handleSort } =
        useFilter();

    const { cart } = useCart();
    const cartItems = cart.length
    const { sortBy, order, category } = urlOptions;
    return (
        <>
            <input type="text" placeholder="Search" onChange={onChangeHandlerInput} value={input} />
            <button onClick={handleSearch}>Search</button>
            <DropDown
                onChange={handleSort}
                value={sortBy.length > 0 ? `${sortBy}-${order}` : ``}
                options={sortOptions}
                label="Sort by:"
                name="sort-dropdown"
                id="sort-dropdown"
            />
            <DropDown
                onChange={handleCategory}
                value={category}
                id="category-filter"
                name="category-filter"
                label="Filter by category"
                options={categoryList?.map((value) => ({ value })) || []}
            />
            <p>Cart Items : {cartItems}</p>
        </>
    );
}
