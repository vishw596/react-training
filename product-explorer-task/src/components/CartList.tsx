import useCart from "../context/useCart";
import ProductCard from "./ProductCard";

export default function CartList() {
    const { cart, increaseQuantity, decreaseQuantity } = useCart();
    const cartTotal = parseFloat(cart.reduce((acc, { price, quantity }) => acc + price * quantity, 0).toFixed(2));
    // console.log("Re-rendered!");

    return (
        <>
            <div>
                {cart.map((item) => (
                    <ProductCard
                        key={item.id}
                        {...item}
                        type="cartList"
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                    />
                ))}
                <h4>Cart Total:{cartTotal}</h4>
            </div>
        </>
    );
}
