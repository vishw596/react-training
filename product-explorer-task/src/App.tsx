import Pagination from "./components/Pagination";
import { useFetch } from "./hooks/useFetch";
import ProductList from "./components/ProductList";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import { useFilter } from "./context/useFilter";

export const BASE_URL = `https://dummyjson.com/products`;

export type Product = {
    id: number;
    thumbnail: string;
    title: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
};
type ProductResponse = { products: Product[]; total: number; skip: number; limit: number };
export default function App() {
    
   const {getUrl} = useFilter();
    const URL = getUrl();
    const { data, loading, error } = useFetch<ProductResponse>(URL);

    if (!data || loading) {
        return <>Loading...</>;
    }
    if (error) {
        return <>Something went wrong...</>;
    }
    const { products, total } = data;

    return (
        <>
            <Navbar />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ProductList products={products} />
                <CartList />
            </div>
            <Pagination totalProducts={total}/>
        </>
    );
}

