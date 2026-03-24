// ## **1. Search (Debounced)**

// - **The Task:** Create a search bar that filters the list as you type.
// - **The Constraint:** Do **not** trigger an API call on every keystroke. Wait **500ms** after the user stops typing before fetching.
// - **Expectation:** Use `useEffect` with a `setTimeout` or a custom `useDebounce` hook. [2, 3, 4, 5, 6]

// ## **2. Pagination & Sorting**

// - **The Task:** Display 10 items per page. Add "Next" and "Previous" buttons. Add a dropdown to sort by Price (Low to High / High to Low).
// - **The Constraint:** Use API params for this, not just client-side logic.
// - **Expectation:** Use URL queries like `?limit=10&skip=0&sortBy=price&order=asc`.

// ## **3. Add/Remove Items**

// - **The Task:** Add a "Delete" button to each card and a simple form at the top to "Add" a new product.
// - **The Constraint:** Since this is a public API, it won't *actually* save to their database. You must update your **local state** to reflect the change immediately.
// - **Expectation:** The UI should update instantly (Optimistic UI) even if the API call is just a mock `DELETE` request. [7]

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import SortDropDown from "./components/SortDropDown";
import { useDebounce } from "./hooks/useDebounce";
const BASE_URL = `https://dummyjson.com/products`;



export default function App() {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price: "",
        rating: "",
        stock: "",
    });
    const [products, setProducts] = useState([]);

    const [input, setInput] = useState("");
    const debouncedInput = useDebounce(input, 500);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);

    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("");

    const PAGINATION_URL = `limit=${limit}&skip=${(currentPage - 1) * limit}`;
    const SEARCH_URL = debouncedInput.length > 0 ? `/search?q=${debouncedInput}&` : `?`;
    const SORT_URL = sortBy.length > 0 ? `&sortBy=${sortBy}&order=${order}` : ``;
    const URL = `${BASE_URL}${SEARCH_URL}${PAGINATION_URL}${SORT_URL}`;

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch(URL);
            const { products, total } = await response.json();
            console.log(products, total);
            setProducts(products);
            setTotalPages(Math.max(Math.ceil(total / limit), 1));
        }
        fetchProducts();
    }, [URL, limit]);

    function onChangeHandlerInput(e) {
        setCurrentPage(1);
        setInput(e.target.value);
    }

    

    function handleSort(e) {
        const [sortBy, order = ""] = e.target.value.split("-");
        setOrder(order);
        setSortBy(sortBy);
        setCurrentPage(1);
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    function handleSubmit(e) {
        e.preventDefault();
        setProducts([{ id: crypto.randomUUID(), ...formData }, ...products]);
        setFormData({
            title: "",
            category: "",
            price: "",
            rating: "",
            stock: "",
        });
    }
    return (
        <>
            <input type="text" placeholder="Search" onChange={onChangeHandlerInput} value={input} />
            <SortDropDown handleSort={handleSort} value={sortBy.length > 0 ? `${sortBy}-${order}` : ``} />
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating"
                        value={formData.rating}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                </div>

                <span>
                    <button type="submit">Add Product</button>
                </span>
            </form>
            <div>
                {products.map(({ id, ...product }) => {
                    return <ProductCard key={id} {...product} setProducts={setProducts} id={id} />;
                })}
            </div>
            {products.length === 0 && (
                <>
                    <div>No items on this page</div>
                </>
            )}
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    );
}
