import type { Product } from "../App";
import useCart from "../context/useCart";
import ProductCard from "./ProductCard";

export default function ProductList({ products }: { products: Product[] }) {
    const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
    return (
        <div>
            {products?.map(({ id, ...product }) => {
                const item = cart.find((item) => item.id === id);

                return (
                    <ProductCard
                        key={id}
                        {...product}
                        id={id}
                        type="productList"
                        quantity={item ? item.quantity : 0}
                        addToCart={addToCart}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                    />
                );
            })}
        </div>
    );
}